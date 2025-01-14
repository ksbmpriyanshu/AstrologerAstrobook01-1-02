import React, { useState } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity, 
    Modal 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, fonts, getFontSize } from '../config/Constants';
import { RadioButton } from 'react-native-paper';

const HeaderFilter = ({ navigation, title, statusBar, onFilterChange }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All'); 

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setModalVisible(false); 
        onFilterChange(option); 
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
                    paddingVertical: 12,
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

                <View style={{ flex: 1 }}>
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

                <TouchableOpacity
                    style={{
                        flex: 0,
                        width: '15%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={toggleModal}>
                    <AntDesign
                        name="filter"
                        color={colors.white_color}
                        size={23}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal for bottom sheet with options */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                        {/* <Text style={{ fontSize: 18, marginBottom: 10 }}>Filter</Text> */}

                        {['All', 'Paid', 'Free', 'Completed', 'Missed',].map((option) => (
                            <View key={option} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                                <RadioButton
                                    value={option}
                                    status={selectedOption === option ? 'checked' : 'unchecked'}
                                    onPress={() => handleSelectOption(option)}
                                />
                                <Text>{option}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default HeaderFilter;
