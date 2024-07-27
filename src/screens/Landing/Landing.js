import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '../../components/Slider/Slider';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const data = [
  { title: 'Slide 1', text: 'This is the first slide' },
  { title: 'Slide 2', text: 'This is the second slide' },
  { title: 'Slide 3', text: 'This is the third slide' },
];

const Landing = () => {

  const navigate=useNavigation()
  return (
    <LinearGradient
      colors={['#3385ff', '#e6f0ff', '#e6f2ff']}
      className='flex-1 p-5 items-center'
    >
      <Slider/>
      <CustomButton text='Get Started' onPress={()=>navigate.push('Login')}/>
    </LinearGradient>
  );
};

export default Landing;

