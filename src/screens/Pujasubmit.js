import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../config/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyHeader from '../components/MyHeader';
import { useNavigation } from '@react-navigation/native';

const Pujasubmit = () => {
    const navigation=useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={{ flex: 1 }}>

            <MyHeader title={"Register Puja"} navigation={navigation} />

            <ScrollView style={{ flex: 1 }}>

                {Card()}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </ScrollView>
            <View style={{ alignItems: "center",position:"absolute",bottom:SCREEN_HEIGHT*0.02,left:0,right:0}}>
                    <TouchableOpacity style={{ elevation: 2, width: SCREEN_WIDTH * 0.6, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 15, backgroundColor: colors.background_theme6 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, color: "white" }}>Register Pooja</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );

    function Card() {
        return (
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.022 }}>
                <View
                    style={{
                        height: SCREEN_HEIGHT * 0.23,
                        width: SCREEN_WIDTH * 0.95,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.95, borderRadius: 10 }}
                        source={require('../assets/images/theempress.png')}
                    />
                </View>


                <View style={{ alignItems: 'center', paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 15 }}>Marriage Puja</Text>
                </View>

                <View style={{ gap: SCREEN_HEIGHT * 0.02 }}>

                    <View style={{ alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 12, textAlign: 'justify' }}>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessar



                        </Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: 'justify' }}>Prize: 50</Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: 'justify' }}>Admin Commission: 50</Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: 14 }}>
                                {date.toLocaleDateString()} {date.toLocaleTimeString()}
                            </Text>

                            <TouchableOpacity onPress={showDatepicker}>
                                <MaterialIcons name="date-range" size={18} color={colors.black_color9} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, }}>Duration:30 min</Text>
                    </View>


                </View>

                
            </View>


        );
    }
};

export default Pujasubmit;

const styles = StyleSheet.create({});
