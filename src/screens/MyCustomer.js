import { StyleSheet, Text, View, Image, FlatList, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MyHeader from '../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, img_url } from '../config/Constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { connect } from 'react-redux';
import * as HistoryActions from '../redux/actions/HistoryActions';

const MyCustomer = ({ MyCustomerData, dispatch, BlockUser, FAVuser }) => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(MyCustomerData || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reasonblock, setReasonblock] = useState('');




    useEffect(() => {
        dispatch(HistoryActions.getMyCustomerDATA());
    }, [dispatch]);

    useEffect(() => {
        dispatch(HistoryActions.getBlockCustomerDATA());
    }, [dispatch]);

    useEffect(() => {
        dispatch(HistoryActions.getFavCutomerDATA());
    }, [dispatch]);



    const handleCheckboxChange = (reason) => {
        setReasonblock(reason);
    };


    const BlockCustomer = () => {


        const data = {

            customerId: selectedCustomer?.customerId,
            reason: reasonblock


        }



        dispatch(HistoryActions.getBlockCustomerDATA(data));
    };



    const FavCustomer = () => {


        const data = {

            customerId: selectedCustomer?.customerId,
           


        }

        console.log("Favcutomeranuj", data)


        dispatch(HistoryActions.getFavCutomerDATA(data));
    };




    useEffect(() => {
        if (MyCustomerData && Array.isArray(MyCustomerData)) {
            const filteredData = MyCustomerData.filter(item =>
                item?.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCustomers(filteredData);
        }
    }, [searchQuery, MyCustomerData]);

    const renderanujItem = ({ item }) => {
        const date = new Date(item?.createdAt);
        const formattedDate = date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        return (
            <View style={{ marginVertical: SCREEN_HEIGHT * 0.01, paddingHorizontal: SCREEN_WIDTH * 0.02, backgroundColor: 'white', elevation: 1, paddingTop: SCREEN_HEIGHT * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: colors.black_color5, paddingBottom: SCREEN_HEIGHT * 0.01 }}>
                    <View style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, alignItems: "center", justifyContent: "center", borderRadius: 100, overflow: "hidden" }}>


                        {/* <Image style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16 }} source={{ uri: img_url + (item?.customerProfile || '') }} /> */}
                        {item?.customerProfile ? (
                            <Image
                                source={{ uri: img_url + item?.customerProfile }}
                                style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16 }}

                            />
                        ) : (
                            <Image
                                source={require('../assets/images/AVTARBOOK.png')}
                                style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16 }}
                            />
                        )}

                    </View>

                    <View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>{item?.customerName || 'Unknown Customer'}</Text>
                        <Text style={{ ...Fonts.black14RobotoRegular, fontSize: responsiveFontSize(1.7) }}>last Connected on: <Text style={{ ...Fonts.black14RobotoRegular, fontSize: responsiveFontSize(1.7) }}>{formattedDate}</Text></Text>
                        <Text style={{ ...Fonts.black12RobotoRegular, fontSize: responsiveFontSize(1.7) }}>Session Type: <Text style={{ ...Fonts.black14RobotoRegular, fontSize: responsiveFontSize(1.7), color: "#51A300" }}> {item?.type || 'N/A'}</Text></Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("CustomerSessions")}>
                        <AntDesign name="right" color={colors.black_color9} size={18} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.05, paddingTop: SCREEN_HEIGHT * 0.01 }}>
                    <TouchableOpacity

                        onPress={() => {
                            FavCustomer();
                            setSelectedCustomer(item);
                        }}

                        style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                        <View>
                            <AntDesign name='heart' color={"#EF4D5E"} size={15} />
                        </View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Mark as Favorite</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsModalVisible(true);
                            setSelectedCustomer(item);
                        }}
                        style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                        <View>
                            <Image style={{ height: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.045, }} source={require('../assets/images/Cancel_light.png')} />
                        </View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Block</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                        <View>
                            <Image style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06 }} source={require('../assets/images/Chat_alt_3_fill.png')} />
                        </View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Send Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={"My Customer "} navigation={navigation} />

            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, paddingTop: SCREEN_HEIGHT * 0.015 }}>
                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#E6E6E6", borderRadius: 100, paddingHorizontal: SCREEN_WIDTH * 0.035, gap: 8, elevation: 1 }}>
                    <AntDesign name='search1' size={20} color={colors.black_color6} />
                    <TextInput
                        placeholder='Search'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{ flex: 1, fontSize: responsiveFontSize(1.8) }}
                    />
                </View>
            </View>

            {filteredCustomers.length === 0 ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.4 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: colors.black_color5 }}>
                        No customer found
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredCustomers}
                    renderItem={renderanujItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingVertical: SCREEN_HEIGHT * 0.015 }}
                />
            )}

            {isModalVisible && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                style={{ paddingVertical: SCREEN_HEIGHT * 0.005, alignItems: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.02 }}
                            >
                                <Image
                                    style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                    source={require('../assets/images/Dell_duotone_broken_line.png')}
                                />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", }}>
                                <Text style={{ ...Fonts.helveticaBoldBlack }}>
                                    {selectedCustomer?.customerName || 'Unknown Customer'} - 41xx4...
                                </Text>
                            </View>

                            <View style={{ alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                                <Text style={{ textAlign: "center", ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.4) }}>
                                    {selectedCustomer?.customerName || 'Unknown Customer'} Won’t be able to interact or connect with you through any sessions.
                                </Text>
                            </View>


                            <View style={{ gap: 6, paddingTop: SCREEN_HEIGHT * 0.025 }}>

                                <View style={{ flexDirection: "row", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={colors.background_theme6}
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "#00BFFF" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => handleCheckboxChange('Billing / Charge issue')}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>Billing / Charge issue</Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={colors.background_theme6}
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "#00BFFF" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => handleCheckboxChange('Customer is Abusive / Fraud')}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>Customer is Abusive / Fraud</Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={colors.background_theme6}
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "#00BFFF" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => handleCheckboxChange('Misuse of Free Services')}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>Misuse of Free Services</Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={colors.background_theme6}
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "#00BFFF" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => handleCheckboxChange('Cannot establish a good connection')}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>Connot establish a good     connection</Text>
                                </View>

                                <View style={{ flexDirection: "row", paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={colors.background_theme6}
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "#00BFFF" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => handleCheckboxChange('Other')}
                                    />
                                    <Text style={{ ...Fonts.black11InterMedium, alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>Other</Text>
                                </View>

                            </View>


                            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, paddingTop: SCREEN_HEIGHT * 0.02 }}>

                                <View style={{ borderWidth: 1, borderColor: colors.black_color4, paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 10, backgroundColor: "#FBFBFB", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                                    <TextInput placeholder='Please share Your reason'
                                        style={{ ...Fonts.black11InterMedium, bottom: SCREEN_HEIGHT * 0.032 }}
                                        value={reasonblock}
                                        onChangeText={setReasonblock}
                                    />
                                </View>

                            </View>

                            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, paddingTop: SCREEN_HEIGHT * 0.02 }}>
                                <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.3) }}>Note : you can unblock any user anytime from the My Customer’ Section</Text>
                            </View>


                            <View style={{ paddingTop: SCREEN_HEIGHT * 0.045, alignItems: "center" }}>
                                <TouchableOpacity

                                    onPress={() => {

                                        setIsModalVisible(false)
                                        BlockCustomer()
                                    }}


                                    style={{ width: SCREEN_WIDTH * 0.5, paddingVertical: SCREEN_HEIGHT * 0.023, alignItems: "center", borderRadius: 100, backgroundColor: colors.background_theme6, elevation: 1 }}>
                                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}>
                                        Block
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const mapStateToProps = state => ({
    MyCustomerData: state.history.MyCustomerData,
    BlockUser: state.history.BlockUser,
    FAVuser: state.history.FAVuser,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MyCustomer);

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.75,
        paddingHorizontal: SCREEN_WIDTH * 0.02
    },
    modalText: {
        fontSize: responsiveFontSize(2),
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 20,
    },
    modalButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.8),
    },
});
