import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';

const MyMessage = ({navigation}) => {
  return (
    <View>
      <MyHeader title="Message" navigation={navigation} />
    </View>
  );
};

export default MyMessage;

const styles = StyleSheet.create({});
