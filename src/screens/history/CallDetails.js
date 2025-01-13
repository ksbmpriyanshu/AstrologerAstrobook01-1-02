import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FeaturedHeader from '../../components/FeaturedHeader';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { colors, img_url } from '../../config/Constants';
import moment from 'moment';

const CallDetails = ({ navigation, route }) => {
  const { ChatData } = route.params;

  const customerName = ChatData?.customerDetails?.customerName;

  // Formatting the dates and times using moment.js
  const createdAtFormatted = moment(ChatData?.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const dateOfBirthFormatted = moment(ChatData?.intakeDetailes?.dateOfBirth).format('MMMM Do YYYY');
  const timeOfBirthFormatted = moment(ChatData?.intakeDetailes?.timeOfBirth, 'HH:mm').format('h:mm A');
  const placeOfBirth = moment(ChatData?.intakeDetailes?.placeOfBirth).format('MMMM Do YYYY');

  if (!ChatData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No Call Data Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FeaturedHeader title={'Call Details'} navigation={navigation} />
      <View style={styles.chatDetailsContainer}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: img_url + (ChatData?.customerDetails?.image || '') }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>

          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{customerName || "Unknown"}</Text>
            <Text style={styles.profileDate}>{createdAtFormatted}</Text>
          </View>
        </View>

        <View style={styles.container2}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoLabel}>Marital Status:</Text>
              <Text style={styles.infoLabel}>Date of Birth:</Text>
              <Text style={styles.infoLabel}>Time of Birth:</Text>
              <Text style={styles.infoLabel}>Place of Birth:</Text>
              <Text style={styles.infoLabel}>Topic of Concern:</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={[styles.infoValue, styles.centerAligned]}>{customerName}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>{ChatData?.customerDetails?.gender}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>{customerName || 'N/A'}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>{dateOfBirthFormatted}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>{timeOfBirthFormatted}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>{placeOfBirth}</Text>
              <Text style={[styles.infoValue, styles.centerAligned]}>
                {ChatData?.intakeDetailes?.topic_of_concern || 'N/A'}
              </Text>
            </View>
          </View>
        </View>



        {/* Reach Out Button */}
        <TouchableOpacity style={styles.reachOutButton}>
          <Text style={styles.reachOutButtonText}>Reach Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteDark,
  },
  container2: {
    backgroundColor: "white",
    elevation: 5,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2)
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
  },
  imageContainer: {
    width: responsiveScreenWidth(15),
    height: responsiveScreenWidth(15),
    borderRadius: 1000,
    overflow: 'hidden',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: responsiveScreenWidth(3),
  },
  profileName: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: 'bold',
  },
  profileDate: {
    fontSize: responsiveScreenFontSize(1.5),
    color: 'gray',
  },


  infoLabel: {
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: '600',
    color: 'black',
    paddingVertical:responsiveScreenHeight(0.3)
    
  },
  infoValue: {
    fontSize: responsiveScreenFontSize(1.8),
    color: 'gray',
    paddingVertical:responsiveScreenHeight(0.3)

  },


  reachOutButton: {
    backgroundColor: colors.background_theme6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    width: responsiveScreenWidth(80),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(5)
  },
  reachOutButtonText: {
    fontSize: responsiveScreenFontSize(1.7),
    color: 'white',
  },
});

export default CallDetails;
