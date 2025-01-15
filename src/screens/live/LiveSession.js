import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { navigate } from '../../NavigationService';
import { useNavigation } from '@react-navigation/native';

const LiveSession = ({navigation}) => {
    const [activeTab, setActiveTab] = useState('Scheduled');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Live Session'} navigation={navigation}/>
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

                <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", width:"50%" }}>
                    <Image source={require('../../assets/images/createsession.png')}
                        style={{
                            width: responsiveScreenWidth(20),
                            height: responsiveScreenHeight(10),
                            resizeMode: "contain"
                        }}
                    />
                    <Text style={{color:"black", fontWeight:"bold", fontSize:responsiveScreenFontSize(2)}}>Create Session</Text>
                    <Text style={{color:"black", fontSize:responsiveScreenFontSize(1.5), textAlign:""}}>Schedule a session and go live as per your availability.</Text>
                </View>

                {/* Schedule Now Button */}
                <View style={{ paddingHorizontal:20 }}>
                    <TouchableOpacity style={styles.scheduleButton} onPress={()=> navigation.navigate('scheduleSession')}>
                        <Text style={{ fontWeight: "700", color: 'black' }}>Schedule Now</Text>
                    </TouchableOpacity>
                </View>
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
