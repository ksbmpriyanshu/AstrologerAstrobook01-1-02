import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { Colors, Fonts } from '../../assets/style'
import { Image } from 'react-native'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import * as PujaActions from "../../redux/actions/PujaActions"
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { colors } from '../../config/Constants'

const PujaCategory = ({ dispatch, newPoojaCategoryData }) => {
    // console.log("newPoojaCategoryData", newPoojaCategoryData)
    const navigation = useNavigation()
    useEffect(() => {
        dispatch(PujaActions.getPoojacategoryData())
    }, [])

    // console.log("check the new puja data:::::", newPoojaCategoryData);
    
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={colors.book_status_bar} barStyle={'dark-content'} />
            <View style={{}}>
                <MyHeader title={'Astro Book'} navigation={navigation} />
                <View style={{ paddingHorizontal: 10, }}>
                    <Image source={require('../../assets/images/pooja_banner.png')} style={styles.bannerImage} />
                </View>
                <FlatList data={newPoojaCategoryData} renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>{
                       
                         navigation.navigate('pujaMall', { categoryId: item?._id });
                         
                    }}
                 >
                    <View style={{ borderRadius: 20, paddingHorizontal: 10,marginBottom:10, }}>
                    <View style={[styles.backgroundWrapper]}>
                  
                        <ImageBackground
                            source={require('../../assets/images/epooja.png')}
                            style={styles.background}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay} />
                            <Text style={styles.text}>{item?.categoryName}</Text>
                        </ImageBackground>
                    </View>
                  
                    <ImageBackground
                        source={require('../../assets/images/price.png')}
                        style={styles.priceTag}
                    >
                        <Text style={styles.priceText}>START AT ₹{item?.startingPrice}</Text>
                    </ImageBackground>
                </View>
                </TouchableOpacity>
                )
                }}
                numColumns={2} 
                keyExtractor={(item, index) => index.toString()}
                />
               
            </View>
        </View>
    )
}


const mapStateToProps = state => ({
    newPoojaCategoryData: state.puja.newPoojaCategoryData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PujaCategory);

const styles = StyleSheet.create({
    bannerImage: {
        width: "100%",
        height: responsiveScreenHeight(20),
        objectFit: "contain",
    },
    backgroundWrapper: {
        width: responsiveScreenWidth(44),
        height: responsiveScreenHeight(20),
        borderRadius: 13,
        overflow: 'hidden',
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 10,
    },

    text: {
        textAlign: 'center',
        color: "#fff",
        ...Fonts.primaryHelvetica,
        fontSize: 16,
        fontWeight: "600"
    },

    priceTag: {
        position: "absolute",
        left: 10,
        top: 0,
        width: 90,
        height: 20,
        resizeMode: "contain",

    },
    priceText: {
        fontSize: 8,
        color: "#fff",
        textAlign: "center",
        marginLeft: -5,
        marginTop: 3,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 13,
    },
})