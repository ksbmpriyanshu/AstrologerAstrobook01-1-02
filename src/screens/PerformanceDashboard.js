import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MyHeader from '../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { Colors, Fonts } from '../assets/style'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors } from '../config/Constants'
import Slider from '@react-native-community/slider';
import { Rating } from 'react-native-ratings'

const PerformanceDashboard = () => {
    const navigation = useNavigation();
    const [sliderValue, setSliderValue] = useState(4.1);

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
            <MyHeader title="Performance" navigation={navigation} />
            {TopContent()}
            {ProfilePerformance()}
            {/* {SliderContent()} */}
        </ScrollView>
    );

    function TopContent() {
        return (
            <View>
                <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.38) }}>Basic on Your Performance Between Aug 21, 2024- Nov 19 2024</Text>
                </View>
                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: 2, borderBottomColor: Colors.gray }}>
                    <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }}>
                        <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(2.2) }}>Overall Rating</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", gap: SCREEN_WIDTH * 0.04, alignItems: "center", borderBottomWidth: 1.1, borderBottomColor: Colors.gray2, paddingBottom: 2 }}>
                        <View style={{ height: SCREEN_HEIGHT * 0.14, width: SCREEN_WIDTH * 0.28, elevation: 1, borderRadius: 100, backgroundColor: colors.background_theme6, alignItems: "center", justifyContent: "center" }}>

                            <Text style={{ ...Fonts.helveticaBoldBlack, color: colors.white_color, fontSize: responsiveFontSize(3) }}>4.1</Text>
                        </View>


                        <View style={{ gap: SCREEN_HEIGHT * 0.015, }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <View style={{ height: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH * 0.04, borderRadius: 100, backgroundColor: "red", elevation: 1 }}></View>
                                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Poor</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <View style={{ height: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH * 0.04, borderRadius: 100, backgroundColor: colors.background_theme6, elevation: 1 }}></View>
                                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Poor</Text>
                            </View><View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <View style={{ height: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH * 0.04, borderRadius: 100, backgroundColor: "green", elevation: 1 }}></View>
                                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.4) }}>Poor</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function ProfilePerformance() {
        const DATA = [
            { id: '1', title: 'Chat Performance', Rating: "2.2" },
            { id: '2', title: 'Call Performance', Rating: "4.2" },
            { id: '3', title: 'Satisfaction Rate', Rating: "3.2" },
            { id: '4', title: 'Retention Rate', Rating: "1.2" },
            

        ];

        const renderItem = ({item}) => {
            return (

                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, marginVertical: SCREEN_HEIGHT * 0.02 }}>

                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.005, borderWidth: 1, borderColor: "#ddd" }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.gray2, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.8) }}>{item.title}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                            <View style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, borderRadius: 100, backgroundColor: colors.background_theme6, elevation: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ ...Fonts.helveticaBoldBlack, color: colors.white_color, fontSize: responsiveFontSize(1.8) }}>{item.Rating}</Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.5) }}>Average</Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: "row", paddingVertical: SCREEN_HEIGHT * 0.01 }}>


                            <Slider
                                style={{ width: '30%', }}
                                minimumValue={1}
                                maximumValue={3}
                                step={0.1}
                                value={sliderValue}
                                onValueChange={(value) => setSliderValue(value)}
                                minimumTrackTintColor="red"
                                maximumTrackTintColor="red"
                                thumbTintColor="#1EB1FC"


                            />


                            <Slider
                                style={{ width: '30%', }}
                                minimumValue={3}
                                maximumValue={4}
                                step={0.1}
                                value={sliderValue}
                                onValueChange={(value) => setSliderValue(value)}
                                minimumTrackTintColor={colors.background_theme6}
                                maximumTrackTintColor={colors.background_theme6}
                                thumbTintColor="#1EB1FC"

                            />
                            <Slider
                                style={{ width: '30%', }}
                                minimumValue={4}
                                maximumValue={5}
                                step={0.1}
                                value={sliderValue}
                                onValueChange={(value) => setSliderValue(value)}
                                minimumTrackTintColor={"#7DCA31"}
                                maximumTrackTintColor="#d3d3d3"
                                thumbTintColor="#1EB1FC"

                            />
                        </View>

                        <View>
                            <Text style={{ ...Fonts.black11InterMedium, textAlign: "justify", fontSize: responsiveFontSize(1.4) }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in</Text>
                        </View>
                    </View>
                    
                </View>
            )
        }

        return (
            <View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                    <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(2.2) }}>Profile Performance</Text>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}

                />
            </View>

        )
    }


    function SliderContent() {
        return (
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, marginTop: SCREEN_HEIGHT * 0.02 }}>
                <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(2.0) }}>Rate Your Performance</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={5}
                    step={0.1}
                    value={sliderValue}
                    onValueChange={(value) => setSliderValue(value)}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#1EB1FC"

                />
                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5), textAlign: 'center', marginTop: 10 }}>
                    Rating: {sliderValue.toFixed(1)}
                </Text>
            </View>
        );
    }
}

export default PerformanceDashboard;

const styles = StyleSheet.create({})
