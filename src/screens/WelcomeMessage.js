import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MyHeader from '../components/MyHeader';
import { Fonts } from '../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { colors } from '../config/Constants';

const WelcomeMessage = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
            <MyHeader title={"Change Welcome Message"} navigation={navigation} />

            {Currentmessage()}
            {OrderMessages()}


        </View>
    )
    function Currentmessage() {
        return (
            <View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#FFF6E4", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Current Message</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.025, alignItems: "center", backgroundColor: "#F4F4F4", paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.8, }}>
                        <Text style={{ ...Fonts.black11InterMedium,textAlign:"justify" }}>Welcome to anytime astro.our expert is
                            studying you details & will connnect with you
                            witing few minute you candrop in your question by you</Text>
                    </View>
                    <TouchableOpacity style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: "white", elevation: 1 }}>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH * 0.04, resizeMode: "contain" }}
                            source={require('../assets/images/editANUJJ.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function OrderMessages() {
        return (
            <View>
                        <View style={{paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#FFF6E4", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Order Message</Text>
                        </View>
                        <View style={{alignItems:"center",paddingTop:SCREEN_HEIGHT*0.25}}>
                        <View style={{height:SCREEN_HEIGHT*0.1,width:SCREEN_WIDTH*0.2,}}>
                                <Image 
                                style={{height:SCREEN_HEIGHT*0.1,width:SCREEN_WIDTH*0.2,resizeMode:"contain"}}
                                source={require('../assets/images/CHATblack.png')}/>
                        </View>
                        <View>
                            <Text style={{...Fonts.black11InterMedium}}>No Message Found</Text>
                        </View>
                        </View>
                        
            </View>
        )
    }
}

export default WelcomeMessage

const styles = StyleSheet.create({})