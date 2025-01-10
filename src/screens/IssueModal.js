import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../config/Constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts } from '../assets/style';
import * as HistoryActions from '../redux/actions/HistoryActions';
import { connect } from 'react-redux'

const IssueModal = ({ modalVisible, toggleModal, onSubmit, IssueData, dispatch }) => {
    console.log("IssueData....", IssueData)

    useEffect(() => {
        dispatch(HistoryActions.getIssueData());
    }, [dispatch])
    const [concern, setConcern] = useState('');
    const [clickedButton, setClickedButton] = useState(null);

    const handleSubmit = () => {
        onSubmit(concern);
        toggleModal();
    };


    const submitData = () => {


        const data = {

            description: concern
        }


        dispatch(HistoryActions.getIssueData(data));
    };

    const handleButtonPress = (buttonType) => {
        setClickedButton(buttonType);
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>


                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.025, alignItems: "center" }}>
                        <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(2) }}>Facing Any issue ?</Text>
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.023, paddingTop: SCREEN_HEIGHT * 0.02 }}>
                        <View style={{ borderWidth: 1, height: SCREEN_HEIGHT * 0.15, borderWidth: 1, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02, borderColor: colors.black_color6 }}>

                            <TextInput
                                placeholder='Please share your Concern'
                                style={{ ...Fonts.black11InterMedium, color: colors.black_color6 }}
                                value={concern}
                                onChangeText={setConcern} />


                        </View>
                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01, alignItems: "center" }}>
                        <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color6, fontSize: responsiveFontSize(1.3) }}>
                            Maximum Characters Allowed : 450
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SCREEN_WIDTH * 0.04, paddingTop: SCREEN_HEIGHT * 0.015 }}>
                        <TouchableOpacity
                          
                            onPress={() => {
                                handleButtonPress('notNow');
                               
                                toggleModal();
                            }}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: clickedButton === 'notNow' ? colors.background_theme6 : 'white',
                                },
                            ]}
                        >
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>Not Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleButtonPress('submit');
                                submitData();
                                toggleModal();
                            }}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: clickedButton === 'submit' ? colors.background_theme6 : 'white',
                                },
                            ]}
                        >
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>Submit</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </Modal>
    );
};

const mapStateToProps = state => ({
    RegisterPujadata: state.history.RegisterPujadata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(IssueModal);


const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',

        height: SCREEN_HEIGHT * 0.36,
        width: SCREEN_WIDTH * 0.9,

        borderRadius: 20
    },
    button: {
        borderWidth: 1,
        width: SCREEN_WIDTH * 0.28,
        height: SCREEN_HEIGHT * 0.055,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderColor: colors.background_theme6,
    },


    closeButton: {
        backgroundColor: colors.background_theme6,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
})