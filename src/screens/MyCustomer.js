import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MyHeader from '../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../config/Constants';

const MyCustomer = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, }}>
            <MyHeader title={"My Customer "} navigation={navigation} />

            {Customers()}



        </View>
    )
    function Customers() {
        return (
            <View style={{top:10,paddingHorizontal:SCREEN_WIDTH*0.02,paddingVertical:SCREEN_HEIGHT*0.02,backgroundColor:'white',elevation:1}}>

                <View style={{flexDirection:'row',justifyContent:"space-between",}}>

                
                    <View style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, alignItems: "center", justifyContent: "center" }}>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16 }}
                            source={require("../assets/images/Logo2.png")} />
                    </View>

                    <View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>Shradha Agrawal</Text>
                        <Text style={{ ...Fonts.black14RobotoRegular, fontSize: responsiveFontSize(1.8) }}>last Connected on : 22-Nov-2024,02:55PM</Text>
                        <Text style={{ ...Fonts.black12RobotoRegular, fontSize: responsiveFontSize(1.8) }}>Session Type : Chat</Text>
                    </View>

                    <View>
                        <AntDesign name="right"
                            color={colors.black_color9}
                            size={18}
                        />
                    </View>




                </View>

                <View>

                            <View>

                            </View>


                </View>
                

            </View>
        )
    }
}

export default MyCustomer

const styles = StyleSheet.create({})