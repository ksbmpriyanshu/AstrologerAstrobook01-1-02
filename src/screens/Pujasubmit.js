import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, img_url } from '../config/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyHeader from '../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import * as HistoryActions from '../redux/actions/HistoryActions';

const Pujasubmit = ({ route, RegisterPujadata, dispatch }) => {

    console.log("RegisterPujadata",RegisterPujadata);

    useEffect(() => {
        dispatch(HistoryActions.getRegisterdPujaData());
    }, [dispatch])

    const { PujaData } = route.params;
    // console.log("dataofpuja", PujaData)
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [duration, setDuration] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };


    const showDateTimePicker = () => {
        setMode(prevMode => (prevMode === 'date' ? 'time' : 'date'));
        setShow(true);
    };

    const handleRegisterPuja = () => {

        const formattedDate = date.toISOString();
      
        const formattedTime = date.toISOString();

        const data ={
            pujaId: PujaData._id,
            pujaStartDate: formattedDate,
            pujaStartTime: formattedTime,
            duration: duration
        }
   

        dispatch(HistoryActions.getRegisterdPujaData(data));
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
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </ScrollView>

            <View style={{ alignItems: "center", position: "absolute", bottom: SCREEN_HEIGHT * 0.02, left: 0, right: 0 }}>
                <TouchableOpacity
                    onPress={handleRegisterPuja}
                    style={{ elevation: 2, width: SCREEN_WIDTH * 0.6, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 15, backgroundColor: colors.background_theme6 }}>
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
                        source={{ uri: img_url + PujaData?.image }}
                    />
                </View>

                <View style={{ alignItems: 'center', paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: 15 }}>{PujaData?.pujaName}</Text>
                </View>

                <View style={{ gap: SCREEN_HEIGHT * 0.02 }}>
                    <View style={{ alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 12, textAlign: 'justify' }}>
                            {PujaData?.shortDescription}
                        </Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: 'justify' }}>Prize: {PujaData?.price}</Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 14, textAlign: 'justify' }}>Admin Commission: {PujaData?.adminCommission}%</Text>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.005 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: 14 }}>

                                {date.toLocaleDateString()} {date.toLocaleTimeString()}
                            </Text>


                            <TouchableOpacity onPress={showDateTimePicker}>
                                <MaterialIcons name="date-range" size={18} color={colors.black_color9} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                        <TextInput
                            placeholder='Duration (in mins)'
                            placeholderTextColor={colors.black_color9}
                            style={{ color: colors.black_color9 }}
                            value={duration}
                            onChangeText={setDuration}
                            keyboardType='numeric' />
                    </View>
                </View>
            </View>
        );
    }
};
const mapStateToProps = state => ({
    RegisterPujadata: state.history.RegisterPujadata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Pujasubmit);




const styles = StyleSheet.create({});
