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
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
import moment from 'moment';
import {secondsToHMS, showNumber} from '../../utils/services';
import {base_url, colors, getFontSize, img_url} from '../../config/Constants';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import MyHeader from '../../components/MyHeader';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const VideoHistory = ({
  videoCallHistoryData,
  dispatch,
  navigation,
  astroData,
}) => {
  useEffect(() => {
    dispatch(HistoryActions.getVideoCallHistory());
  }, [dispatch]);
  const renderItem = ({item, index}) => {
    console.log(item, 'videodata');
    const totalVideoCallPrice = parseFloat(item?.totalPrice) || 0;
    const VideoCall2 =
      astroData?.normal_video_call_price +
      parseFloat(astroData?.commission_normal_video_call_price);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('videocalldetails', {ChatData: item})
        }>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: img_url + item?.customerId?.image}}
                style={{width: '100%', height: '100%', borderRadius: 1000}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{...Fonts.primaryLight14RobotoMedium}}>
                {item?.customerId?.customerName}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                {/* Call Price: {showNumber(callPrice)}/min */}
                Live Call Price: {showNumber(item?.roomId?.vedioCallPrice)}/min
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Commision Price: {showNumber(item?.adminPrice)}/min
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                Astro Price: {showNumber(item?.partnerPrice)}
              </Text>
              <Text
                style={{...Fonts.gray12RobotoMedium, color: Colors.blackLight}}>
                {/* Status: {item?.status || 'N/A'} */}
                Status: Completed
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
        No history available.
      </Text>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteDark}}>
      <MyHeader title={'Video Call Order History'} navigation={navigation} />
      {videoCallHistoryData && (
        <FlatList
          data={videoCallHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{paddingVertical: SCREEN_HEIGHT * 0.01}}
          ListEmptyComponent={NoDataFound}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  videoCallHistoryData: state.history.videoCallHistoryData,
  astroData: state.provider.providerData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(VideoHistory);

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 0.7,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    paddingVertical: Sizes.fixPadding,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_WIDTH * 0.13,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
