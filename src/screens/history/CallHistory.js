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
import moment from 'moment';
import {Sizes, Colors, Fonts} from '../../assets/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
import {secondsToHMS, showNumber} from '../../utils/services';
import {base_url, fonts, getFontSize, img_url} from '../../config/Constants';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import MyHeader from '../../components/MyHeader';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../config/Constants';

const CallHistory = ({dispatch, callHistoryData, navigation}) => {
  useEffect(() => {
    dispatch(HistoryActions.getCallHistory());
  }, [dispatch]);

  console.log("check the call data::::", callHistoryData);
  

  const renderItem = ({item}) => {
    const transactionId = item?.transactionId || '';
    const last10Chars = transactionId.slice(-10);

    const durationInSeconds = parseFloat(item?.durationInSeconds) || 0;
    const callPrice = parseFloat(item?.callPrice) || 0;
    const totalCallPrice = parseFloat(item?.totalCallPrice) || 0;
    const commissionPrice =
      durationInSeconds > 0 ? parseFloat(item?.commissionPrice) || 0 : 0;
    const astroCharges =
      durationInSeconds > 0 ? totalCallPrice - commissionPrice : 0;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('calldetails', {ChatData: item})}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: img_url + (item?.customerDetails?.image || '')}}
                style={{width: '100%', height: '100%', borderRadius: 1000}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{...Fonts.primaryLight14RobotoMedium}}>
                {item?.customerDetails?.customerName}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Call Price: {showNumber(callPrice)}/min
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Commission Price: {showNumber(commissionPrice)}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Duration: {secondsToHMS(durationInSeconds)}
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
                {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
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

  const NoDataFound = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.9,
      }}>
      <Text style={{color: Colors.black, fontSize: getFontSize(1.8)}}>
        No call history available.
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteDark}}>
      <MyHeader title={'Call Order History'} navigation={navigation} />
      {callHistoryData && (
        <FlatList
          data={callHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{padding: Sizes.fixPadding * 1.5}}
          ListEmptyComponent={NoDataFound}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  callHistoryData: state.history.callHistoryData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);

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
});
