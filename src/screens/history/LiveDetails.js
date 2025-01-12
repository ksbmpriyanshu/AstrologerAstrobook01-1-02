import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyHeader from '../../components/MyHeader';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Fonts, Sizes} from '../../assets/style';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {SCREEN_WIDTH} from '../../config/Screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ChatActions from '../../redux/actions/ChatActions';
import {img_url} from '../../config/Constants';

const LiveDetails = ({
  navigation,
  route,
  dispatch,
  previousChats,
  providerData,
}) => {
  const {ChatData} = route.params;

  console.log('Received Chat Data::::::K', ChatData?.customerId?._id);

  const customerName = ChatData?.customerId?.customerName;

  useEffect(() => {
    dispatch(ChatActions.getPreviousChat(ChatData?.customerId?._id));
  }, [dispatch]);

  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <MyHeader title={'Live Call Details'} navigation={navigation} />

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: img_url + (ChatData?.customerId?.image || '')}}
              style={{width: '100%', height: '100%', borderRadius: 1000}}
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{customerName}</Text>
            <Text style={styles.profileDate}>{ChatData?.endTime || 'N/A'}</Text>
          </View>
        </View>

        {/* Offer Minutes Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Offer Minute :</Text>
            <Text style={styles.rowValues}>
              {ChatData?.durationInSeconds} Min
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Free Munutes :</Text>
            <Text style={styles.rowValues}>0 MIN</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Paind Minutes :</Text>
            <Text style={styles.rowValues}>0 MIN</Text>
          </View>
          <Text style={styles.sessionEndText}>Customer Ended the Session</Text>
        </View>

        {/* Expert Summary Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Expert Summary</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Reference ID :</Text>
            <Text style={styles.rowValues}>{ChatData?.transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Session type :</Text>
            <Text style={styles.rowValues}>Paid</Text>
          </View>

          <View style={{borderWidth: 0.2, borderColor: '#B5B5B5'}}></View>
          <View style={styles.rowtotal}>
            <Text style={styles.rowLabel}>Total Earnings :</Text>
            <Text style={styles.rowValues}>₹ 999.00</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        {/* Title Button for Chat */}
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            margin: 5,
          }}
          onPress={toggleChat}>
          <Text style={{fontSize: 16, color: 'black'}}>Chat History</Text>
        </TouchableOpacity>

        {/* Conditionally Render Chat */}
        {isChatVisible && (
          <ImageBackground
            source={require('../../assets/images/chat_bg.png')}
            style={{
              width: SCREEN_WIDTH,
              flex: 1,
              backgroundColor: '#FFF2D9',
            }}
            resizeMode="cover">
            <GiftedChat
              messages={previousChats}
              user={{
                _id: `customer_${providerData?._id}`,
                name: providerData?.customerName,
              }}
              renderUsernameOnMessage={true}
              alwaysShowSend={false}
              placeholder="No more messages"
              textInputProps={{
                editable: false,
              }}
              renderSend={() => null}
              renderInputToolbar={() => null}
              renderBubble={props => {
                const {currentMessage} = props;
                return (
                  <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor: '#E0C987',
                      },
                      left: {
                        backgroundColor: '#FFFFFF',
                      },
                    }}
                    textStyle={{
                      right: {color: '#000', fontSize: 12},
                      left: {color: '#000', fontSize: 12},
                    }}
                  />
                );
              }}
            />
          </ImageBackground>
        )}
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  previousChats: state.chat.previousChats,
  providerData: state.provider.providerData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(LiveDetails);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.whiteDark,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E0',
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: responsiveScreenHeight(12),
  },
  profileImage: {
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(15),
    resizeMode: 'contain',
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: Sizes.fixPadding,
  },
  profileName: {
    ...Fonts.gray16RobotoMedium,
    color: Colors.black,
  },
  profileDate: {
    ...Fonts.gray12RobotoRegular,
    color: Colors.black,
    marginTop: Sizes.fixPadding * 0.5,
  },
  sectionContainer: {
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding * 1.5,
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 0.7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    ...Fonts.primaryLight14RobotoMedium,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Sizes.fixPadding,
  },
  rowValues: {
    flexDirection: 'row',
    paddingLeft: Sizes.fixPadding * 6,
    // marginBottom: Sizes.fixPadding,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: Sizes.fixPadding * 1.5,
    marginBottom: Sizes.fixPadding,
  },
  rowtotal: {
    flexDirection: 'row',
    paddingLeft: Sizes.fixPadding * 1.4,
    paddingVertical: Sizes.fixPadding,
  },
  rowLabel: {
    ...Fonts.gray12RobotoMedium,
    color: Colors.blackLight,
  },
  rowValue: {
    ...Fonts.primaryLight14RobotoMedium,
    color: Colors.black,
  },
  sessionEndText: {
    textAlign: 'center',
    marginTop: Sizes.fixPadding * 1.5,
    color: Colors.red,
    ...Fonts.primaryLight14RobotoMedium,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
    borderRadius: 1000,
    overflow: 'hidden',
    alignItems: 'center',
  },

  // --------------p-------------------

  astrologerImage: {
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(11),
    objectFit: 'cover',
    borderRadius: 100,
  },
  astrologerName: {
    ...Fonts.primaryHelvetica,
    color: '#000',
    fontSize: 17,
    fontWeight: '600',
  },
  astrologerMode: {
    ...Fonts.primaryHelvetica,
    color: '#dadada',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 2,
    flex: 0.08,
  },
  customFooter: {
    backgroundColor: '#381415',
    padding: 10,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  customFooterText: {
    fontSize: 13,
    color: '#fff',
    ...Fonts.primaryHelvetica,
  },
  chatBtn: {
    backgroundColor: '#F1B646',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  chatText: {
    color: '#000',
    textAlign: 'center',
    ...Fonts.primaryHelvetica,
    fontSize: 15,
    fontWeight: '600',
  },
});
