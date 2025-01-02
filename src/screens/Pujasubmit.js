import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { Fonts } from '../assets/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../config/Constants';

const Pujasubmit = () => {
    return (
        <View style={{ flex: 1, }}>

            {Card()}



        </View>
    )
    function Card() {
        return (
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.022 }}>

                <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.95, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>

                    <Image
                        style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.95, borderRadius: 10 }}
                        source={require('../assets/images/theempress.png')} />

                </View>

                <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.01 }}>

                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 15 }}>Marriage Puja</Text>
                </View>

                <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.005 }}>

                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 12, textAlign: "justify" }}>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical</Text>
                </View>


                <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>

                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: "justify" }}>Prize:50</Text>
                </View>

                <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>

                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: "justify" }}>Admin  Commision:50</Text>
                </View>

                <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>


                    <View style={{ flexDirection: "row", alignItems: "center", gap: 25 }}>

                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, }}> mm/dd/yyyy __:__:__</Text>

                        <TouchableOpacity>
                            <MaterialIcons name='date-range' size={18} color={colors.black_color9} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }
}

export default Pujasubmit

const styles = StyleSheet.create({})