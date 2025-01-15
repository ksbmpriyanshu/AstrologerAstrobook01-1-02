import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { SelectList } from 'react-native-dropdown-select-list';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ScheduleSession = ({ navigation }) => {
    const [selected, setSelected] = useState("");
    const [selectedTime, setSelectedTime] = useState(""); // To store selected time
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(''); // To store selected date

    // Sample data for SelectLists (categories)
    const data = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ];

    // Time data for SelectList
    const timeData = [
        { key: '1', value: '10:00 AM' },
        { key: '2', value: '12:00 PM' },
        { key: '3', value: '2:00 PM' },
        { key: '4', value: '4:00 PM' },
    ];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date.toLocaleDateString()); // Format as needed
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        setSelectedTime(time.toLocaleTimeString()); // Format time if needed
        hideTimePicker();
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Schedule Session'} navigation={navigation} />

            <View style={{ flex: 1, paddingHorizontal: responsiveScreenWidth(4), paddingVertical: responsiveScreenHeight(2) }}>
                {/* Dropdown for Categories */}
                <View>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                </View>

                {/* Dropdown for Time */}
                <View style={{ paddingVertical: responsiveScreenHeight(2) }}>
                    <SelectList
                        setSelected={(val) => setSelectedTime(val)}
                        data={timeData}
                        save="value"
                    />
                </View>

                {/* TextInput to display selected Date */}
                <View>
                    <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            value={selectedDate}
                            placeholder='Select Date'
                            editable={false}
                            onTouchStart={showDatePicker} // Open the date picker on input click
                            style={{
                                borderWidth: 0.5,
                                borderRadius: 10,
                                paddingLeft: 10,
                                paddingVertical: 10,
                                marginBottom: responsiveScreenHeight(2),
                            }}
                        />
                    </TouchableOpacity>

                    {/* Date Picker Modal */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />
                </View>

                {/* TextInput to display selected Time */}
                <View>
                    <TouchableOpacity onPress={showTimePicker}>
                        <TextInput
                            value={selectedTime} // Display selected time
                            placeholder='Select Start Time'
                            editable={false} // Make the input non-editable
                            onTouchStart={showTimePicker} // Open the time picker on input click
                            style={{
                                borderWidth: 0.5,
                                borderRadius: 10,
                                paddingLeft: 10,
                                paddingVertical: 10,
                                marginBottom: responsiveScreenHeight(2),
                            }}
                        />
                    </TouchableOpacity>

                    {/* Time Picker Modal */}
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                    />
                </View>

                {/* Additional Input for Duration (In Minutes) */}
                <View>
                    <TextInput
                        placeholder='Duration (In Minutes)'
                        keyboardType='numeric'
                        maxLength={2}
                        style={{
                            borderWidth: 0.5,
                            borderRadius: 10,
                            paddingLeft: 10,
                            paddingVertical: 10,
                            marginBottom: responsiveScreenHeight(2),
                        }}
                    />
                </View>

                {/* Schedule Now Button at the bottom */}
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity
                        style={styles.scheduleButton}
                        onPress={() => navigation.navigate('scheduleSession')}
                    >
                        <Text style={{ fontWeight: "700", color: 'black' }}>Schedule Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ScheduleSession;

const styles = StyleSheet.create({
    scheduleButton: {
        backgroundColor: '#F1B646',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveScreenWidth(10),
        paddingVertical: responsiveScreenHeight(1.6),
    }
});
