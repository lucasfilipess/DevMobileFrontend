import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

function MyIdeas() {
  const route = useRoute();
  const token = route.params.token;
  return <View />;
}

export default MyIdeas;
