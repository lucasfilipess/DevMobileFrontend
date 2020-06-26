import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../../store';

function Filter() {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Filtrar por :</Text>
        <FontAwesome name="filter" size={60} color="black" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Layout');
            setUser({ ...user, filter: 'recent' });
          }}
        >
          <Text style={styles.text}>Mais novas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Layout');
            setUser({ ...user, filter: 'old' });
          }}
        >
          <Text style={styles.text}>Mais antigas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Layout');
            setUser({ ...user, filter: 'likes' });
          }}
        >
          <Text style={styles.text}>Mais curtidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Layout');
            setUser({ ...user, filter: 'deslikes' });
          }}
        >
          <Text style={styles.text}>Menos curtidas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Layout')}>
          <AntDesign
            style={styles.back}
            name="arrowleft"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Filter;
