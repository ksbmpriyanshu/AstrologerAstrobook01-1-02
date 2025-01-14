import { StyleSheet, Text, View ,TextInput ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import MyHeader from '../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { Fonts } from '../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { colors } from '../config/Constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useSelector } from 'react-redux'
import * as NotificationsActions from '../redux/actions/NotificationsActions'
import { connect } from 'react-redux'
import { goBack } from '../navigations/NavigationServices';

const UpdatePhone = ({UpdatePhonenumber,dispatch}) => {
  const navigation = useNavigation();
  const providerData = useSelector((state) => state.provider.providerData); 


const [NewPhoneNO, SetNewPhoneNO] = useState(null);

  console.log("anuj", providerData?.phoneNumber)

const updatedphone = () => {

        const data = {


          newPhoneNumber: NewPhoneNO,
          




        }
       console.log("anuddddddddddd",data);

        dispatch(NotificationsActions.getUpdatePhoneNumber(data));
    };



  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"Change Phone Number"} navigation={navigation} />
      {oldPhone()}
      {NewPhone()}
      {Update()}

    </View>
  )

  function oldPhone() {
    return (
      <View>


        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025,paddingTop:SCREEN_HEIGHT*0.035 }}>


          <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.001, borderRadius: 100, backgroundColor: Colors.white, position: "absolute", zIndex: 1, left: SCREEN_WIDTH * 0.07, bottom: SCREEN_HEIGHT * 0.06 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1), color: colors.black_color6 }}>Old Phone No.</Text>
          </View>


          <View style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, borderRadius: 10, backgroundColor: "#F3F3F3" }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>{providerData?.phoneNumber}</Text>
          </View>
        </View>

      </View>
    )
  }
  function NewPhone() {
          return (
              <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.025, gap: SCREEN_HEIGHT * 0.02 }}>
  
  
  
                  <View style={{ borderWidth: 1,   borderRadius: 10, backgroundColor: "white", paddingHorizontal: SCREEN_WIDTH * 0.025, borderColor: colors.black_color4, }}>
  
                      <TextInput
  
                          placeholder="New Phone No."
                          placeholderTextColor={colors.black_color6}
                       
                          style={{ ...Fonts.black11InterMedium, width: SCREEN_WIDTH * 0.8 }}
                          value={NewPhoneNO}
                          onChangeText={SetNewPhoneNO}
  
  
                      />
                     
  
                  </View>
  
  
                
  
  
  
              </View>
          )
      }

      function Update() {
              return (
                  <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.25, paddingTop: SCREEN_HEIGHT * 0.6 }}>
                      <TouchableOpacity
      
      
                          onPress={() => {
                            updatedphone();
                              goBack();
                          }}
      
      
                          style={{ paddingVertical: SCREEN_HEIGHT * 0.02, alignItems: "center", backgroundColor: colors.background_theme6, borderRadius: 100 }}>
                          <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>
                              Update
                          </Text>
                      </TouchableOpacity>
                  </View>
              )
          }
}

const mapStateToProps = state => ({


  UpdatePhonenumber: state.notificationReducer.UpdatePhonenumber

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhone);



const styles = StyleSheet.create({})