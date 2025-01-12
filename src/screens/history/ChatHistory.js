import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Colors, Sizes, Fonts} from '../../assets/style';
import {SCREEN_WIDTH} from '../../config/Screen';
import moment from 'moment';
import {secondsToHMS, showNumber} from '../../utils/services';
import {img_url} from '../../config/Constants';
import MyHeader from '../../components/MyHeader';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

// Function to round up seconds to the next whole minute
const roundUpToNextMinute = seconds => Math.ceil(seconds / 60);

const ChatHistory = ({chatHistoryData, navigation, dispatch}) => {
  useEffect(() => {
    dispatch(HistoryActions.getChatHistory());
  }, [dispatch]);

  // console.log('chat history', chatHistoryData);

  const renderItem = ({item}) => {
    // Extract values from item or set default values if not available
    const transactionId = item?.transactionId || '';
    const last10Chars = transactionId.slice(-10);

    // Ensure values are positive numbers
    const durationInSeconds = parseFloat(item?.durationInSeconds) || 0;
    const roundedDurationInMinutes = roundUpToNextMinute(durationInSeconds);
    const chatPrice = parseFloat(item?.chatPrice) || 0;

    // Calculate total chat price based on rounded-up duration in minutes
    const totalChatPrice = roundedDurationInMinutes * chatPrice;

    // Commission price should be zero if the duration is zero
    const commissionPrice =
      roundedDurationInMinutes > 0 ? parseFloat(item?.commissionPrice) || 0 : 0;
    const astroCharges =
      roundedDurationInMinutes > 0
        ? Math.max(0, totalChatPrice - commissionPrice)
        : 0;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('chatdetails', {CallData: item})}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: img_url + (item?.customerId?.image || '')}}
                style={{width: '100%', height: '100%', borderRadius: 1000}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{...Fonts.primaryLight14RobotoMedium}}>
                {item?.customerId?.customerName || 'N/A'}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Total Charges: {showNumber(totalChatPrice)}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Commission Price: {showNumber(commissionPrice)}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Astro Charges: {showNumber(astroCharges)}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Status: {item?.status || 'N/A'}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: responsiveScreenWidth(2),
              }}>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                {item?.createdAt
                  ? moment(new Date(item?.createdAt)).format(
                      'DD MMM YYYY, hh:mm A',
                    )
                  : 'N/A'}
              </Text>
              <Image
                source={require('../../assets/icon/rightarrow.png')}
                style={{
                  width: responsiveScreenWidth(2),
                  height: responsiveScreenHeight(2),
                  marginTop: responsiveScreenHeight(1.5),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteDark}}>
      <MyHeader title={'Chat Order History'} navigation={navigation} />
      {chatHistoryData && chatHistoryData.length > 0 ? (
        <FlatList
          data={chatHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{padding: Sizes.fixPadding * 1.5}}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No chat history available.</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  chatHistoryData: state.history.chatHistoryData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 0.7,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    paddingVertical: Sizes.fixPadding,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: 1000,
    overflow: 'hidden',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...Fonts.gray14RobotoRegular,
    color: Colors.black,
  },
});
