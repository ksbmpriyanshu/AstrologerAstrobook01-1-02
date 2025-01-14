import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    Linking,
    PermissionsAndroid,
    Alert,
    Platform
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts, getFontSize } from '../config/Constants';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';



const FeaturedHeader = ({ navigation, title, statusBar, socialIcons = false, download = false, id, language = false }) => {

    const handlePress = () => {
        // The URL to open
        const url = 'https://astrobook.co.in/free-kundli?full-name=gaurav-gunjan&gender=male&date-of-birth=20-13-2000&time-of-birth=10:10&place-of-birth=delhi&latitude=&longitude=';

        // Open the URL in the default browser
        Linking.openURL(url).catch(err => console.error("Failed to open URL", err));
    };


    return (
        <SafeAreaView
            style={{ backgroundColor: colors.background_theme6 }}
            forceInset={{ top: 'always', bottom: 'never' }}>
            <View
                style={{
                    flex: 0,
                    height: 0,
                    backgroundColor: statusBar?.backgroundColor,
                }}>
                <StatusBar
                    translucent
                    backgroundColor={colors.background_theme6}
                    barStyle={statusBar?.barStyle}
                />
            </View>
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingVertical: responsiveScreenHeight(1.8),
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        flex: 0,
                        width: '15%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Ionicons
                        name="arrow-back"
                        color={colors.white_color}
                        size={23}
                    />
                </TouchableOpacity>
                <View style={{ flex: 0.9 }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: getFontSize(2),
                            color: colors.white_color,
                            fontFamily: fonts.medium,
                        }}>
                        {title}
                    </Text>
                </View>
                <TouchableOpacity onPress={handlePress} style={{ elevation: 4, paddingHorizontal: responsiveScreenWidth(4), paddingVertical: responsiveScreenHeight(1), borderRadius: 10, backgroundColor: "white" }}>
                    <Text style={{ color: colors.background_theme6, fontSize: responsiveScreenFontSize(1.4) }}>Get Kundali Report</Text>
                </TouchableOpacity>
            </View>




        </SafeAreaView>
    );
};

export default FeaturedHeader;
