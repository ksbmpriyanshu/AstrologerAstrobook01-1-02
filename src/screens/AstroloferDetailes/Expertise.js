import { StyleSheet, Text, View, FlatList ,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { Fonts } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { colors } from '../../config/Constants';
import { connect } from 'react-redux';
import * as HistoryActions from '../../redux/actions/HistoryActions';

const Expertise = ({ Expertisedata, dispatch }) => {
  const navigation = useNavigation();


  const [selectedExpertise, setSelectedExpertise] = useState([]);

  useEffect(() => {
    dispatch(HistoryActions.getExpertiseDATA());
  }, [dispatch]);

  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
     
      setSelectedExpertise((prev) => [...prev, item.mainExpertise]);
    } else {
     
      setSelectedExpertise((prev) => prev.filter((expertise) => expertise !== item.mainExpertise));
    }
  };

  const goBackWithSelectedExpertise = () => {

    navigation.navigate('astrologerDetailes', { selectedExpertise });
  };

  const renderItem = ({ item }) => (
    <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
        <Text style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveFontSize(1.8) }}>
          {item?.mainExpertise}
        </Text>

        <BouncyCheckbox
          size={25}
          fillColor={colors.background_theme6}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: '#00BFFF' }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked) => handleCheckboxChange(item, isChecked)}
        />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"Category"} navigation={navigation} />
      <FlatList
        data={Expertisedata}
        renderItem={renderItem}   
        keyExtractor={(item) => item.id}
      />
      <View style={{position:"absolute",bottom:30,left:0,right:0}}>
                  <TouchableOpacity
                      onPress={goBackWithSelectedExpertise}
                      style={{ width: SCREEN_WIDTH * 0.5, paddingVertical: SCREEN_HEIGHT * 0.015, backgroundColor: colors.background_theme6, alignSelf: "center", borderRadius: 100, alignItems: 'center', }}>
                      <Text
      
                          style={{ ...Fonts.helveticaBoldBlack, fontSize: responsiveScreenFontSize(2) }}>
                          Select
                      </Text>
                  </TouchableOpacity>
                  </View>
     
    </View>
  );
};

const mapStateToProps = (state) => ({
  Expertisedata: state.history.Expertisedata,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Expertise);

const styles = StyleSheet.create({});
