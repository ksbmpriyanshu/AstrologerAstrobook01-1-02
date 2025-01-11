import { StyleSheet, Text, View ,TouchableOpacity ,KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import MyHeader from '../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { colors, img_url } from '../config/Constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CustomerSessions = () => {
    const [buttonStatus, setButtonStatus] = useState(true);
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 ,backgroundColor:"white" }}>
            <MyHeader title={"My Customer "} navigation={navigation} />

            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingVertical: 15,
                }}>
                <TouchableOpacity
                    onPress={() => setButtonStatus(true)}
                    style={{
                        elevation:2,
                        paddingVertical:SCREEN_HEIGHT*0.02,
                        width:SCREEN_WIDTH*0.38,
                        alignItems:"center",
                        borderRadius:100,
                       
                        backgroundColor: buttonStatus
                            ? colors.background_theme6
                            : colors.background_theme1,
                    }}>
                    <Text allowFontScaling={false}
                        style={{
                            ...Fonts.black11InterMedium,
                            fontSize:responsiveFontSize(1.6),
                            color: buttonStatus
                                ? colors.background_theme1
                                : colors.black_color8,
                        }}>
                        Chat Session
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setButtonStatus(false)}
                    style={{
                        elevation:2,
                        paddingVertical:SCREEN_HEIGHT*0.02,
                        width:SCREEN_WIDTH*0.38,
                        alignItems:"center",
                        borderRadius:100,
                        backgroundColor: !buttonStatus
                            ? colors.background_theme6
                            : colors.background_theme1,
                    }}>
                    <Text allowFontScaling={false}
                        style={{
                        
                            color: !buttonStatus
                                ? colors.background_theme1
                                : colors.black_color8,
                        }}>
                        Call Session
                    </Text>
                </TouchableOpacity>
            </View>
            {buttonStatus ? (
                <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>

                    

                        <Text style={{...Fonts.helveticaBoldBlack,fontSize:responsiveFontSize(2)}}>No Chat Session Found</Text>

                  
                  
                </View>
            ) : (
                <View
                    style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
                   
                   <Text style={{...Fonts.helveticaBoldBlack,fontSize:responsiveFontSize(2)}}>No Call Session Found</Text>
                  
                </View>
            )}




        </View>
    )
}

export default CustomerSessions

const styles = StyleSheet.create({})