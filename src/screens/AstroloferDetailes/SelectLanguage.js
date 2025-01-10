import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { Fonts } from '../../assets/style'
import { responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { colors } from '../../config/Constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/HistoryActions';
import { TouchableOpacity } from 'react-native-gesture-handler'

const SelectLanguage = ({ SelectLanguagedata, dispatch }) => {
    console.log("SelectLanguagedata",SelectLanguagedata)
    const navigation = useNavigation();
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        dispatch(HistoryActions.getSelectLanguageDATA());
    }, [dispatch]);

    const handleLanguageSelection = (languageName, isChecked) => {
        if (isChecked) {
            setSelectedLanguages(prevState => [...prevState, languageName]);
        } else {
            setSelectedLanguages(prevState => prevState.filter(language => language !== languageName));
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
                    <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.8) }}>
                        {item.languageName}
                    </Text>

                    <BouncyCheckbox
                        size={25}
                        fillColor={colors.background_theme6}
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#00BFFF" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        isChecked={selectedLanguages.includes(item.languageName)}
                        onPress={(isChecked) => handleLanguageSelection(item.languageName, isChecked)}
                    />
                </View>
            </View>
        );
    };

    const handleGoBack = () => {

        navigation.navigate('astrologerDetailes', { selectedLanguages });
    };

    return (
        <View style={{ flex: 1 ,backgroundColor:"white"}}>
            <MyHeader title={"Select Language"} navigation={navigation} />

            <View style={{ paddingTop: SCREEN_HEIGHT * 0.03 }}>
                <FlatList
                    data={SelectLanguagedata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{position:"absolute",bottom:30,left:0,right:0}}>
            <TouchableOpacity
                onPress={handleGoBack}
                style={{ width: SCREEN_WIDTH * 0.5, paddingVertical: SCREEN_HEIGHT * 0.015, backgroundColor: colors.background_theme6, alignSelf: "center", borderRadius: 100, alignItems: 'center', }}>
                <Text

                    style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveScreenFontSize(2) }}>
                    Select
                </Text>
            </TouchableOpacity>
            </View>
        </View>
        
    );
};

const mapStateToProps = state => ({
    SelectLanguagedata: state.history.SelectLanguagedata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);

const styles = StyleSheet.create({});
