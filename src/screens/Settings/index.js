import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import profile from '../../../assets/images/profile1.png';
import idea from '../../../assets/images/idea.png';
import { useNavigation } from '@react-navigation/native';

function Settings() {
  useEffect(() => {
    retrieveData();
  }, []);

  const [token, setToken] = useState('');
  const [loading, setLoadind] = useState(false);

  const navigation = useNavigation();

  async function retrieveData() {
    try {
      const response = await AsyncStorage.getItem('token');
      if (response !== null) {
        setToken(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { token })}
          style={styles.button}
        >
          <Image style={styles.icon} source={profile} />

          <View>
            <Text style={styles.textBtn}>Perfil</Text>
            <Text>foto, nome, descrição, email, senha</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyIdeas', { token })}
          style={styles.button}
        >
          <Image style={styles.icon} source={idea} />
          <View>
            <Text style={styles.textBtn}>Ideias</Text>
            <Text>editar, deletar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Settings;
