import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MyHeader from '../../components/MyHeader'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Fonts, Sizes } from '../../assets/style'
import { colors, getFontSize } from '../../config/Constants'
import * as ProviderActions from '../../redux/actions/ProviderActions';
import { connect } from 'react-redux'
import { showNumber } from '../../utils/services'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const MyEarning = ({ navigation, providerData }) => {

    console.log("checking::", providerData);
    console.log("checking::::name", providerData?.account_name);


    // Sample data for earnings and calls
    const earningData = [
        { id: '1', title: 'Today’s Earning', paisa: showNumber(providerData?.today_earnings?.earnings) },
        { id: '2', title: 'Total Call Today', paisa: '1' },
        { id: '3', title: 'My Live Session', paisa: "2" },
        { id: '4', title: 'Total Chats Today', paisa: "10" },
        { id: '5', title: 'Gift Earning', paisa: "10" },
        { id: '6', title: 'Payable Amount', paisa: "6" },
        { id: '7', title: 'TDS Deducted', paisa: "5" },

    ];

    // Render function for each item
    const earningrender = ({ item }) => {
        return (


            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ width: SCREEN_WIDTH * 0.45, height: SCREEN_HEIGHT * 0.12, borderRadius: 10, alignItems: "center", justifyContent: "center", gap: 5, backgroundColor: colors.white_color, elevation: 2, marginHorizontal: SCREEN_WIDTH * 0.015, }}>
                    <Text style={{ fontSize: Sizes.fixPadding * 1.6, fontWeight: "500", color: colors.black_color9 }}>{item.paisa}</Text>
                    <Text style={{ fontSize: Sizes.fixPadding * 1.4, color: colors.black_color6 }}>{item.title}</Text>
                </View>
            </View>


        )
    }



    return (
        <View style={styles.container}>
            <MyHeader title={'My Earnings'} navigation={navigation} />

            {/* FlatList with horizontal scroll */}
            <FlatList
                data={earningData}
                renderItem={earningrender}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />

            

        </View>
    )
}


const mapStateToProps = state => ({
    providerData: state.provider.providerData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MyEarning);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F1F1',
    },
    container2: {
        paddingHorizontal: responsiveScreenWidth(5),
        paddingVertical: responsiveScreenHeight(3),
        marginTop: responsiveScreenHeight(3),
        borderRadius: responsiveScreenWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveScreenHeight(12),
        backgroundColor: 'white',
        marginRight: responsiveScreenWidth(3),
        elevation: 5,
        width: responsiveScreenWidth(46),
    },

    imageContainer: {
        width: SCREEN_WIDTH * 0.11,
        height: SCREEN_WIDTH * 0.11,
        borderRadius: 1000,
        overflow: 'hidden',
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...Fonts.gray14RobotoRegular,
        color: Colors.black,
    },
})
