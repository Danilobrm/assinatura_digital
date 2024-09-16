import React from 'react';
import {View, Text, Image} from 'react-native';
import logo from '../assets/hospital_logo.png';
import {width} from '@fortawesome/free-solid-svg-icons/faUsers';

const Idle = () => {
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Image source={logo} style={{marginTop: -100}} />
    </View>
  );
};

export default Idle;
