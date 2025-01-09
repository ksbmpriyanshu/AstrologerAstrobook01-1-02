import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import MyHeader from '../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { colors } from '../config/Constants'
import { Colors, Fonts } from '../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'

const MyLeaves = () => {
    const navigation = useNavigation();
    const [buttonStatus, setButtonStatus] = useState(true);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyHeader title={"My Leaves"} navigation={navigation} />
            <ScrollView>
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 13,

                        backgroundColor: "#FFF6E4"
                    }}>
                    <TouchableOpacity
                        onPress={() => setButtonStatus(true)}
                        style={{
                            ...styles.buttonContainer,
                            backgroundColor: buttonStatus
                                ? colors.background_theme6
                                : 'white',
                        }}>
                        <Text
                            style={{
                                ...Fonts.black11InterMedium,
                                fontSize: responsiveFontSize(1.8),
                                color: buttonStatus
                                    ? colors.white_color
                                    : colors.black_color9,
                            }}>
                            Past Leaves
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setButtonStatus(false)}
                        style={{
                            ...styles.buttonContainer,
                            backgroundColor: !buttonStatus
                                ? colors.background_theme6
                                : 'white',
                        }}>
                        <Text
                            style={{
                                ...Fonts.black11InterMedium,
                                fontSize: responsiveFontSize(1.8),
                                color: !buttonStatus
                                    ? colors.white_color
                                    : colors.black_color9,
                            }}>
                            Applied Leaves
                        </Text>
                    </TouchableOpacity>
                </View>
                {buttonStatus ? (
                    <View style={{ flex: 1, }}>




                        <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.3, gap: 5 }}>

                            <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.25, }}>
                                <Image
                                    style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.25, resizeMode: "contain" }}
                                    source={require('../assets/images/umrella.png')} />
                            </View>
                            <Text style={{
                                ...Fonts.black11InterMedium,
                                fontSize: responsiveFontSize(1.3),
                            }}>No Past Leave History Found !</Text>

                        </View>

                    </View>
                ) : (

                    <View style={{ flex: 1 }}>

                        <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.3, gap: 5 }}>

                            <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.25, }}>
                                <Image
                                    style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.25, resizeMode: "contain" }}
                                    source={require('../assets/images/umrella.png')} />
                            </View>
                            <Text style={{
                                ...Fonts.black11InterMedium,
                                fontSize: responsiveFontSize(1.3),
                            }}>No Leave History Found !</Text>

                        </View>


                    </View>

                )}
            </ScrollView>

        </View>
    )
}

export default MyLeaves

const styles = StyleSheet.create({

    buttonContainer: {
        width: '40%',
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 1,
        alignItems: "center"
    },
})