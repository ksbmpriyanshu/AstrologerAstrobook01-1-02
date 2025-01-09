import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Linking } from 'react-native'
import React from 'react'
import MyHeader from '../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { Fonts } from '../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors } from '../config/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Language from './language/language'

const SettingBook = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, }}>
            <MyHeader title={"Setting"} navigation={navigation} />
            <ScrollView style={{ flex: 1 }}>
                {MangeProfile()}
                {Language()}
                {Links()}
                {button()}
            </ScrollView>
        </View>
    )
    function MangeProfile() {
        return (
            <View>
                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#F4F4F4", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Profile Manage</Text>
                </View>


                <TouchableOpacity style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/ASTROPROFILE.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Update Email Address</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/WELCOMEMESSAGE.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Update Phone Number</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/BOOKChhata.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>WhatsApp Number</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('forgetPassword')}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/HAVEANISSUE.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Change Password</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/SETTINGBOOK.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Bank Details</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>

            </View>
        )
    }
    function Language() {
        return (
            <View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#F4F4F4", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Language</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>(navigation.navigate('language'))}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/language.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> Change Application Language</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function Links() {
        return (
            <View>
                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#F4F4F4", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Important Links</Text>
                </View>
                <TouchableOpacity 
                 onPress={() => Linking.openURL('https://astrobook.freekundli.in/#/terms-of-use').catch(err => console.error('Failed to open URL', err))}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/language.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Terms and Condition</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => Linking.openURL('https://astrobook.freekundli.in/#/privacy-policy').catch(err => console.error('Failed to open URL', err))}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/language.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Privacy Policy</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("supportdata")}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/language.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>Help & Support</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => Linking.openURL('https://astrobook.freekundli.in/#/about-us').catch(err => console.error('Failed to open URL', err))}
                style={styles.buttonContainer}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.03 }}>
                        <View style={{ backgroundColor: colors.background_theme6, height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06, resizeMode: "contain" }}
                                source={require('../assets/images/language.png')} />
                        </View>
                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>About Us</Text>
                        </View>

                    </View>


                    <View>
                        <AntDesign
                            name="right"

                            size={20}

                        />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function button() {
        return (
            <View style={{alignItems:"center",paddingVertical:19}}>


                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",gap:5,paddingVertical:SCREEN_HEIGHT*0.02,width:SCREEN_WIDTH*0.5,justifyContent:"center",borderRadius:100,backgroundColor:"#EF4D5E",elevation:1}}>
                <AntDesign
                    name="delete"
                        color={"white"}
                    size={20}

                />

              
                <Text style={{...Fonts.black11InterMedium,color:colors.white_color,fontSize:responsiveFontSize(1.5)}}>Delete My Account</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SettingBook

const styles = StyleSheet.create({

    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: SCREEN_WIDTH * 0.02,
        paddingVertical: SCREEN_HEIGHT * 0.013,
        justifyContent: "space-between",
        paddingHorizontal: SCREEN_WIDTH * 0.025,
        backgroundColor: colors.white_color,
        borderBottomWidth: 1,
        borderBottomColor: colors.black_color4
    },


})