import React, { useState, useEffect, useContext } from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import api from '../../../service/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from '../../../../assets/images/register.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '../../../utils/Modal';
import { AntDesign } from '@expo/vector-icons';
import DropdownMenu from '../../../utils/DropdownMenu';
import profile1 from '../../../../assets/images/profile1.png';
import profile2 from '../../../../assets/images/profile2.png';
import profile3 from '../../../../assets/images/profile3.png';
import profile4 from '../../../../assets/images/profile4.png';
import profile5 from '../../../../assets/images/profile5.png';
import { UserContext } from '../../../store';

function Profile() {
  useEffect(() => {
    getMyData();
  }, []);

  const route = useRoute();
  const token = route.params.token;
  const [user, setUser] = useContext(UserContext);
  const [values, setValues] = useState({
    name: '',
    description: '',
    profile_picture: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const rows = [
    { data: { label: 'Foto de perfil', value: 'profile1' } },
    { data: { label: 'Opção 1', value: 'profile5' } },
    { data: { label: 'Opção 2', value: 'profile4' } },
    { data: { label: 'Opção 3', value: 'profile3' } },
    { data: { label: 'Opção 4', value: 'profile2' } },
  ];

  const navigation = useNavigation();

  async function getMyData() {
    try {
      await api
        .get('users/my-data', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setValues(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    if (
      values.name &&
      values.description &&
      values.email &&
      values.password &&
      confirmPassword
    ) {
      if (values.password === confirmPassword) {
        const data = {
          name: values.name,
          description: values.description,
          profile_picture: values.profile_picture,
          email: values.email,
          password: values.password,
        };

        try {
          await api
            .put('users', data, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              setIsActive({ ...isActive, success: true });
              setUser((e) => ({ ...e, name: data.name }));
              setUser((e) => ({ ...e, picture: data.profile_picture }));
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

      confirmPassword === ''
        ? setErrorInput((e) => ({ ...e, confirmPassword: true }))
        : setErrorInput((e) => ({ ...e, confirmPassword: false }));
    }
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
        onPress={() => navigation.navigate('Layout')}
        style={styles.back}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        {values.profile_picture === 'profile1' && (
          <Image source={profile1} style={styles.profile} />
        )}
        {values.profile_picture === 'profile2' && (
          <Image source={profile2} style={styles.profile} />
        )}
        {values.profile_picture === 'profile3' && (
          <Image source={profile3} style={styles.profile} />
        )}
        {values.profile_picture === 'profile4' && (
          <Image source={profile4} style={styles.profile} />
        )}
        {values.profile_picture === 'profile5' && (
          <Image source={profile5} style={styles.profile} />
        )}
        <View style={styles.input_group}>
          <DropdownMenu
            style={errorInput.type ? styles.errorDropMenu : styles.dropMenu}
            rows={rows}
            selectedValue={values.profile_picture}
            onValueChange={(e) => {
              setValues({ ...values, profile_picture: e });
            }}
          />
          <TextInput
            placeholder="Nome"
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
              setConfirmPassword(e);
              setErrorInput({ ...errorInput, confirmPassword: false });
            }}
            value={confirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.textBtn}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          text="Confira se todos os campos estão preenchidos corretamente"
          error={true}
          modalVisible={isActive.error}
          onPress={() => setIsActive({ ...isActive, error: !isActive.error })}
        />
        <CustomModal
          text="Dados alterados com sucesso !!!"
          success={true}
          modalVisible={isActive.success}
          onPress={() =>
            setIsActive({ ...isActive, success: !isActive.success })
          }
        />
        <CustomModal
          text="Este email já está cadastrado."
          error={true}
          modalVisible={isActive.email}
          onPress={() => setIsActive({ ...isActive, email: !isActive.email })}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

export default Profile;
