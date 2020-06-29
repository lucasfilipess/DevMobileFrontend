import React, { useState, useContext } from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Container } from 'native-base';
import api from '../../service/api';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/images/register.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '../../utils/Modal';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../store';

function Register() {
  const [values, setValues] = useState({
    name: '',
    description: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isActive, setIsActive] = useState({
    error: false,
    success: false,
    email: false,
  });

  const [errorInput, setErrorInput] = useState({
    name: false,
    description: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleRegister() {
    setLoading(true);
    if (
      values.name &&
      values.description &&
      values.email &&
      values.password &&
      values.confirmPassword
    ) {
      if (values.password === values.confirmPassword) {
        const data = {
          name: values.name,
          description: values.description,
          profile_picture: 'profile1',
          email: values.email,
          password: values.password,
        };

        try {
          await api.post('users', data).then((response) => {
            setIsActive({ ...isActive, success: true });
            setUser((e) => ({ ...e, name: response.data.name }));
            setUser((e) => ({ ...e, picture: response.data.profile_picture }));
            storeData('token', response.data.token);
            navigation.navigate('Layout');
          });
        } catch (error) {
          setIsActive({ ...isActive, email: true });
          setErrorInput((e) => ({ ...e, email: true }));
        }
      } else {
        setIsActive({ ...isActive, error: true });
        setErrorInput((e) => ({ ...e, password: true }));
        setErrorInput((e) => ({ ...e, confirmPassword: true }));
      }
    } else {
      setIsActive({ ...isActive, error: true });
      values.name === ''
        ? setErrorInput((e) => ({ ...e, name: true }))
        : setErrorInput((e) => ({ ...e, name: false }));

      values.description === ''
        ? setErrorInput((e) => ({ ...e, description: true }))
        : setErrorInput((e) => ({ ...e, description: false }));

      values.email === ''
        ? setErrorInput((e) => ({ ...e, email: true }))
        : setErrorInput((e) => ({ ...e, email: false }));

      values.password === ''
        ? setErrorInput((e) => ({ ...e, password: true }))
        : setErrorInput((e) => ({ ...e, password: false }));

      values.confirmPassword === ''
        ? setErrorInput((e) => ({ ...e, confirmPassword: true }))
        : setErrorInput((e) => ({ ...e, confirmPassword: false }));
    }
    setLoading(false);
  }

  async function storeData(name, data) {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (error) {
      console.log('Error saving data');
    }
  }
  return (
    <>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Login')}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <Image source={logo} style={styles.logo} />
        {loading && <ActivityIndicator size="large" color="#000" />}

        <View style={styles.input_group}>
          <TextInput
            placeholder="Nome"
            maxLength={30}
            placeholderTextColor="#000"
            style={errorInput.name ? styles.errorInput : styles.input}
            onChangeText={(e) => {
              setValues({ ...values, name: e });
              setErrorInput({ ...errorInput, name: false });
            }}
            value={values.name}
          />
          <TextInput
            placeholder="Descrição"
            maxLength={140}
            placeholderTextColor="#000"
            style={errorInput.description ? styles.errorInput : styles.input}
            onChangeText={(e) => {
              setValues({ ...values, description: e });
              setErrorInput({ ...errorInput, description: false });
            }}
            value={values.description}
          />

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
            placeholderTextColor="#000"
            style={errorInput.password ? styles.errorInput : styles.input}
            onChangeText={(e) => {
              setValues({ ...values, password: e });
              setErrorInput({ ...errorInput, password: false });
            }}
            value={values.password}
          />
          <TextInput
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            type="password"
            placeholderTextColor="#000"
            style={
              errorInput.confirmPassword ? styles.errorInput : styles.input
            }
            onChangeText={(e) => {
              setValues({ ...values, confirmPassword: e });
              setErrorInput({ ...errorInput, confirmPassword: false });
            }}
            value={values.confirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.textBtn}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          text="Confira se todos os campos estão preenchidos corretamente"
          error={true}
          modalVisible={isActive.error}
          onPress={() => setIsActive({ ...isActive, error: !isActive.error })}
        />
        <CustomModal
          text="Usuário criado com sucesso. Seja bem vindo a PlayHouse!!!"
          success={true}
          modalVisible={isActive.success}
          onPress={() =>
            setIsActive({ ...isActive, success: !isActive.success })
          }
        />
        <CustomModal
          text="Este email já está cadastrado ou não é um email válido."
          error={true}
          modalVisible={isActive.email}
          onPress={() => setIsActive({ ...isActive, email: !isActive.email })}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

export default Register;
