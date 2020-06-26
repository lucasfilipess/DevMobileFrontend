import React, { useState, useContext } from 'react';
import styles from './styles';
import {
  AsyncStorage,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../service/api';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/images/logo-name.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '../../utils/Modal';
import { UserContext } from '../../store';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isActive, setIsActive] = useState(false);
  const [errorInput, setErrorInput] = useState({
    email: false,
    password: false,
  });
  const [user, setUser] = useContext(UserContext);

  const navigation = useNavigation();

  async function handleLogin() {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      await api.post('login', data).then((response) => {
        storeData('token', response.data.token);
        setUser((e) => ({ ...e, name: response.data.name }));
        setUser((e) => ({ ...e, picture: response.data.profile_picture }));
        navigation.navigate('Layout');
      });
    } catch (error) {
      setIsActive(true);
      setErrorInput((e) => ({ ...e, email: true }));
      setErrorInput((e) => ({ ...e, password: true }));
    }
  }

  async function storeData(name, data) {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (error) {
      ('Error saving data');
    }
  }
  return (
    <>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <Image source={logo} style={styles.logo} />
        <View style={styles.input_group}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={errorInput.email ? styles.errorInput : styles.input}
            onChangeText={(e) => {
              setValues({ ...values, email: e });
              setErrorInput({ ...errorInput, email: false });
            }}
            value={values.email}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            type="password"
            placeholderTextColor="#000"
            style={errorInput.password ? styles.errorInput : styles.input}
            onChangeText={(e) => {
              setValues({ ...values, password: e });
              setErrorInput({ ...errorInput, password: false });
            }}
            value={values.password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textBtn}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.register}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.textRegister}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          text="Ops! Algo está errado, confira se sua senha e email estão corretos."
          error={true}
          modalVisible={isActive}
          onPress={() => setIsActive(!isActive)}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

export default Login;
