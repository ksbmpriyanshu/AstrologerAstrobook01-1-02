import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../assets/style';
import Entypo from 'react-native-vector-icons/Entypo';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../config/Constants';
import { useSelector } from 'react-redux';
import * as NotificationsActions from '../redux/actions/NotificationsActions'
import { connect } from 'react-redux'
import { goBack } from '../navigations/NavigationServices';




const ChangePassword = ({ UpdatePassword, dispatch, }) => {
    const providerData = useSelector((state) => state.provider.providerData);
    // console.log("dataanuj,",providerData);
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [newPassword, SetNewpassword] = useState(null);
    const [confirmpassword, Setconfirmpassword] = useState(null);



    const updatedpassword = () => {

        const data = {


            newPassword: newPassword,
            confirmPassword: confirmpassword




        }
       console.log("anuddddddddddd",data);

        dispatch(NotificationsActions.getUpdatePassword(data));
    };






    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={"Change Password "} navigation={navigation} />
            {OldPassword()}
            {NewPassword()}
            {Update()}
        </View>
    );


    function OldPassword() {
        return (
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.025 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderWidth: 1,
                        paddingVertical: SCREEN_HEIGHT * 0.02,
                        paddingHorizontal: SCREEN_WIDTH * 0.025,
                        borderRadius: 10,
                        backgroundColor: "white",
                        borderColor: colors.black_color4,
                    }}
                >

                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5), color: colors.black_color6 }}>
                        {passwordVisible ? providerData?.password : "Old Password"}
                    </Text>


                    <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
                        <Entypo name={passwordVisible ? 'eye' : 'eye-with-line'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    function NewPassword() {
        return (
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.025, gap: SCREEN_HEIGHT * 0.02 }}>



                <View style={{ borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', borderRadius: 10, backgroundColor: "white", paddingHorizontal: SCREEN_WIDTH * 0.025, borderColor: colors.black_color4, }}>

                    <TextInput

                        placeholder="New Password"
                        placeholderTextColor={colors.black_color6}
                        secureTextEntry={passwordVisible1}
                        style={{ ...Fonts.black11InterMedium, width: SCREEN_WIDTH * 0.8 }}
                        value={newPassword}
                        onChangeText={SetNewpassword}


                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setPasswordVisible1(prevState => !prevState)}
                    >
                        <Entypo name={!passwordVisible1 ? 'eye' : 'eye-with-line'} size={22} />
                    </TouchableOpacity>

                </View>


                <View style={{ borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', borderRadius: 10, backgroundColor: "white", paddingHorizontal: SCREEN_WIDTH * 0.025, borderColor: colors.black_color4, }}>

                    <TextInput

                        placeholder="Confirm Password"
                        placeholderTextColor={colors.black_color6}
                        secureTextEntry={passwordVisible2}
                        value={confirmpassword}
                        onChangeText={Setconfirmpassword}
                        style={{ ...Fonts.black11InterMedium, width: SCREEN_WIDTH * 0.8 }}


                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setPasswordVisible2(prevState => !prevState)}
                    >
                        <Entypo name={!passwordVisible2 ? 'eye' : 'eye-with-line'} size={22} />
                    </TouchableOpacity>

                </View>



            </View>
        )
    }

    function Update() {
        return (
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.25, paddingTop: SCREEN_HEIGHT * 0.5 }}>
                <TouchableOpacity


                    onPress={() => {
                        updatedpassword();
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
};



const mapStateToProps = state => ({


    UpdatePassword: state.notificationReducer.UpdatePassword

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);




const styles = StyleSheet.create({});
