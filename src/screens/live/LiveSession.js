import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const CompletedSession = () => {
    const Data = [
        { id: 1, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 2, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 3, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 4, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 5, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 6, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 7, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 8, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 9, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 10, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 11, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 12, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 13, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 14, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 15, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 16, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 17, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 18, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 19, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 20, title: "Numerology", categroy: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
    ];

    const SessionData = ({ item }) => {
        return (
            <View style={{paddingVertical:responsiveScreenHeight(0.5)}}>
                <View style={{ elevation:4, backgroundColor:"white", padding:10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize:responsiveScreenFontSize(2), color:"black" }}>{item.title}</Text>
                    <Text style={{color:"grey", fontSize:responsiveScreenFontSize(1.6)}}>Category: <Text style={{color:"red", fontWeight:"500", fontSize:responsiveScreenFontSize(1.6)}}>{item.categroy}</Text></Text>
                    <Text style={{color:"grey", fontSize:responsiveScreenFontSize(1.6)}}>Date: <Text style={{color:"black", fontWeight:"500", fontSize:responsiveScreenFontSize(1.6)}}>{item.date}</Text></Text>
                    <Text style={{color:"grey", fontSize:responsiveScreenFontSize(1.6)}}>Start Time: <Text style={{color:"black", fontWeight:"500", fontSize:responsiveScreenFontSize(1.6)}}>{item.startTime}</Text></Text>
                    <Text style={{color:"grey", fontSize:responsiveScreenFontSize(1.6)}}>Duration (In Minutes): <Text style={{color:"black", fontWeight:"500", fontSize:responsiveScreenFontSize(1.6)}}>{item.minutes}</Text></Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={Data}
            renderItem={SessionData}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const LiveSession = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Scheduled');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Live Session'} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {/* Tabs Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, elevation: 2, backgroundColor: "#FFF6E4" }}>
                    {/* Scheduled Tab */}
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'Scheduled' && styles.activeTabButton,
                        ]}
                        onPress={() => handleTabChange('Scheduled')}
                    >
                        <Text style={{ fontSize: responsiveScreenFontSize(1.7), fontWeight: "500" }}>Scheduled</Text>
                    </TouchableOpacity>
                    {/* Completed Tab */}
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'Completed' && styles.activeTabButton,
                        ]}
                        onPress={() => handleTabChange('Completed')}
                    >
                        <Text style={{ fontSize: responsiveScreenFontSize(1.7), fontWeight: "500" }}>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* Conditional Rendering */}
                <View style={{ flex: 1 }}>
                    {activeTab === 'Scheduled' ? (
                        <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", width: "50%" }}>
                            <View style={{justifyContent:"center", alignItems:"center", marginTop:responsiveScreenHeight(22)}}>
                                <Image source={require('../../assets/images/createsession.png')}
                                    style={{
                                        width: responsiveScreenWidth(20),
                                        height: responsiveScreenHeight(10),
                                        resizeMode: "contain"
                                    }}
                                />
                            </View>
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: responsiveScreenFontSize(2) }}>Create Session</Text>
                            <Text style={{ color: "black", fontSize: responsiveScreenFontSize(1.5), textAlign: "center" }}>Schedule a session and go live as per your availability.</Text>
                        </View>
                    ) : (
                        <CompletedSession />
                    )}
                </View>

                {/* Schedule Now Button */}
                {activeTab === 'Scheduled' && (
                    <View style={{ paddingHorizontal: 20 }}>
                        <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('scheduleSession')}>
                            <Text style={{ fontWeight: "700", color: 'black' }}>Schedule Now</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default LiveSession;

const styles = StyleSheet.create({
    tabButton: {
        paddingHorizontal: responsiveScreenWidth(15),
        paddingVertical: responsiveScreenHeight(1.3),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: '#F1B646',
        elevation: 6,
        borderColor: '#F1B646',
        fontWeight: "bold"
    },
    scheduleButton: {
        backgroundColor: '#F1B646',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveScreenWidth(10),
        paddingVertical: responsiveScreenHeight(1.6),
    }
});
