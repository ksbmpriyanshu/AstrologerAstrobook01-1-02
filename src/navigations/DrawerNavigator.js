import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  FlatList,
  ScrollView,
  Modal, TextInput
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { showToastMessage } from '../utils/services';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Share from 'react-native-share';
import { openFacebook, openInstagram, openLinkedIn } from '../components/Methods';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen');
import * as ProviderActions from '../redux/actions/ProviderActions'

const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import { unRegisterZegoCall } from '../utils/zegoServices';
import ProviderHome from '../screens/home/ProviderHome';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { base_url, colors, img_url } from '../config/Constants';
import { Fonts, Sizes } from '../assets/style';
import * as AuthActions from '../redux/actions/AuthActions'
import { navigate } from '../NavigationService';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';

function CustomDrawerContent(props) {

  const [modalVisible, setModalVisible] = useState(false);

  const [clickedButton, setClickedButton] = useState(null);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openWhatsApp = () => {
       
        
    const url = `https://astrobook.freekundli.in/astrologers/${props.props?.providerData?._id}}`;  
  
    console.log('palAnuj',url)
    const message = url; 
    const phoneNumber = '';
    const whatsappUrl = phoneNumber 
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
        : `whatsapp://send?text=${encodeURIComponent(message)}`; 

    Linking.openURL(whatsappUrl)
        .then(() => {
            console.log('WhatsApp opened');
        })
        .catch((err) => {
            console.error('Error opening WhatsApp', err);
        });
};


  const handleButtonPress = (buttonType) => {
    setClickedButton(buttonType);
  };


  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, }}>

      <DrawerContentScrollView {...props.props1}>
        {astrologerData()}
        {astrologerdrawerdata()}
        {logoutfunc()}
      </DrawerContentScrollView>
    </View>
  );
  function logoutfunc() {
    return (
      <View style={{ backgroundColor: colors.white_color, justifyContent: 'center', alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.25, }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Wait', 'Do you want to logout?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => props.props.dispatch(AuthActions.onLogout()),
              },
            ]);
          }}
          style={{ padding: 5, fontSize: 15, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06 }}
            source={require('../assets/images/On_button_duotone.png')} />
          <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
            Sign Out
          </Text>
          {/* <AntDesign
            name="logout"
            color={colors.background_theme6}
            size={20}
            style={{ marginLeft: 5 }}
          /> */}

        </TouchableOpacity>

      </View>
    )
  }
  function astrologerdrawerdata() {
    return (

      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025 }}>
        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }}>
          <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.9) }}>Manage Profile</Text>
        </View>

        <View style={{ gap: SCREEN_HEIGHT * 0.025, paddingVertical: SCREEN_HEIGHT * 0.012 }}>

          <TouchableOpacity 
          onPress={()=>navigation.navigate('astrologerDetailes')}
          style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02 }}>
            <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                source={require('../assets/images/ASTROPROFILE.png')} />
            </View>
            <View>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>My Astro Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>navigation.navigate("WelcomeMessage")}
          style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02 }}>
            <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                source={require('../assets/images/WELCOMEMESSAGE.png')} />
            </View>
            <View>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Change Welcome Message</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>navigation.navigate('MyLeaves')}
          style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02 }}>
            <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                source={require('../assets/images/BOOKChhata.png')} />
            </View>
            <View>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>My Leaves</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleModal}
            style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02 }}>
            <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                source={require('../assets/images/HAVEANISSUE.png')} />
            </View>
            <View>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Have an Issue ?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>navigation.navigate("SettingBook")}
          style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02 }}>
            <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                source={require('../assets/images/SETTINGBOOK.png')} />
            </View>
            <View>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Setting ?</Text>
            </View>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>


                <View style={{ paddingTop: SCREEN_HEIGHT * 0.025, alignItems: "center" }}>
                  <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(2) }}>Facing Any issue ?</Text>
                </View>
                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.023, paddingTop: SCREEN_HEIGHT * 0.02 }}>
                  <View style={{ borderWidth: 1, height: SCREEN_HEIGHT * 0.15, borderWidth: 1, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02, borderColor: colors.black_color6 }}>

                    <TextInput
                      placeholder='Please share your Concern'
                      style={{ ...Fonts.black11InterMedium, color: colors.black_color6 }} />


                  </View>
                </View>

                <View style={{ paddingTop: SCREEN_HEIGHT * 0.01, alignItems: "center" }}>
                  <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.3) }}>
                    Maximum Characters Allowed : 450
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SCREEN_WIDTH * 0.04, paddingTop: SCREEN_HEIGHT * 0.015 }}>
                  <TouchableOpacity
                    onPress={() => handleButtonPress('notNow')} 
                    style={[
                      styles.button,
                      {
                        backgroundColor: clickedButton === 'notNow' ? colors.background_theme6 : 'white',
                      },
                    ]}
                  >
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>Not Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleButtonPress('submit')}
                    style={[
                      styles.button,
                      {
                        backgroundColor: clickedButton === 'submit' ? colors.background_theme6 : 'white',
                      },
                    ]}
                  >
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>Submit</Text>
                  </TouchableOpacity>
                </View>



              </View>
            </View>
          </Modal>

        </View>

      </View>
    )

  }
  function astrologerData() {
    return (

      <View style={{ paddingTop: SCREEN_HEIGHT * 0.015 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.02, backgroundColor: "#FFF6E4" }}>

          <View style={{ height: SCREEN_WIDTH * 0.25, width: SCREEN_WIDTH * 0.25, overflow: 'hidden', borderRadius: 100, borderWidth: 1, borderColor: colors.grey_color }} >
            <Image source={{ uri: base_url + props.props?.providerData?.profileImage }}
              style={{ height: SCREEN_WIDTH * 0.25, width: SCREEN_WIDTH * 0.25, resizeMode: "contain" }}
            />
          </View>

          <View>
            <Text style={{ ...Fonts.helveticaBoldBlack }}>{props.props?.providerData?.astrologerName}</Text>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: 10 }}>{props.props?.providerData?.email}</Text>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: 10 }}>Employee Id : {props.props?.providerData?._id.slice(0, 9)}</Text>
          </View>

          <TouchableOpacity 
          onPress={openWhatsApp}
          style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: "white", elevation: 1 }}>
            <Image
              style={{ height: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.045, resizeMode: "contain" }}
              source={require('../assets/images/shareprofileanuj.png')} />
          </TouchableOpacity>


        </View>


      </View>

    )
  }
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props1 => (
        <CustomDrawerContent props1={props1} props={props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          elevation: 8,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      }}>
      <Drawer.Screen name="providerHome" component={ProviderHome} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
  },
  buttonImage: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#fff8f0',
  },
  circle: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {

    marginLeft: 10,
  },
  socialLogo: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',

    height: SCREEN_HEIGHT * 0.36,
    width: SCREEN_WIDTH * 0.9,

    borderRadius: 20
  },
  button: {
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_HEIGHT * 0.055,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: colors.background_theme6,
  },


  closeButton: {
    backgroundColor: colors.background_theme6,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
