import React, { useState, useEffect } from 'react';
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

import {
  Container,
  Title,
  Tab,
  Tabs,
  TabHeading,
  Left,
  Right,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import api from '../../../../service/api';
import logo from '../../../../../assets/images/edit-idea.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '../../../../utils/Modal';
import DropdownMenu from '../../../../utils/DropdownMenu';
import { useRoute, useNavigation } from '@react-navigation/native';

function EditIdea() {
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    retrieveData();
    setValues(route.params.idea);
  }, []);

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    id: null,
    title: '',
    description: '',
    references: '',
    type: '',
  });
  const [isActive, setIsActive] = useState({
    succes: false,
    error: false,
  });
  const [errorInput, setErrorInput] = useState({
    title: false,
    description: false,
    references: false,
    type: false,
  });
  const rows = [
    { data: { label: 'Selecione o tipo da sua ideia', value: '' } },
    { data: { label: 'Filme', value: 'film' } },
    { data: { label: 'Saúde', value: 'health' } },
    { data: { label: 'Jogo', value: 'game' } },
    { data: { label: 'Video', value: 'video' } },
    { data: { label: 'Música', value: 'music' } },
    { data: { label: 'Estudo', value: 'study' } },
  ];

  async function retrieveData() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateIdea() {
    setLoading(true);
    if (
      values.title &&
      values.description &&
      values.references &&
      values.type
    ) {
      const data = {
        id: values.id,
        title: values.title,
        description: values.description,
        references: values.references,
        type: values.type,
      };
      try {
        await api
          .put('ideas', data, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => {
            setIsActive({ ...isActive, succes: true });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsActive({ ...isActive, error: true });

      values.title === ''
        ? setErrorInput((e) => ({ ...e, title: true }))
        : setErrorInput((e) => ({ ...e, title: false }));

      values.description === ''
        ? setErrorInput((e) => ({ ...e, description: true }))
        : setErrorInput((e) => ({ ...e, description: false }));

      values.references === ''
        ? setErrorInput((e) => ({ ...e, references: true }))
        : setErrorInput((e) => ({ ...e, references: false }));

      values.type === ''
        ? setErrorInput((e) => ({ ...e, type: true }))
        : setErrorInput((e) => ({ ...e, type: false }));
    }
    setLoading(false);
  }

  function clearFields() {
    setValues((e) => ({ ...e, title: '' }));
    setValues((e) => ({ ...e, description: '' }));
    setValues((e) => ({ ...e, references: '' }));
    setValues((e) => ({ ...e, type: '' }));
  }

  return (
    <>
      <Container>
        <Tabs>
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Left style={styles.back}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MyIdeas')}
                  >
                    <AntDesign name="arrowleft" size={30} color="black" />
                  </TouchableOpacity>
                </Left>
                <Title style={styles.titleMenu}>Editar Ideia</Title>
                <Right></Right>
              </TabHeading>
            }
          >
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={true}
            >
              <Image source={logo} style={styles.logo} />
              {loading && <ActivityIndicator size="large" color="#000" />}

              <View style={styles.input_group}>
                <TextInput
                  placeholder="Título"
                  maxLength={25}
                  placeholderTextColor="#000"
                  style={errorInput.title ? styles.errorInput : styles.input}
                  onChangeText={(e) => {
                    setValues({ ...values, title: e });
                    setErrorInput({ ...errorInput, title: false });
                  }}
                  value={values.title}
                />
                <TextInput
                  placeholder="Descrição"
                  maxLength={140}
                  placeholderTextColor="#000"
                  style={
                    errorInput.description ? styles.errorInput : styles.input
                  }
                  onChangeText={(e) => {
                    setValues({ ...values, description: e });
                    setErrorInput({ ...errorInput, description: false });
                  }}
                  value={values.description}
                />
                <TextInput
                  placeholder="Link"
                  placeholderTextColor="#000"
                  style={
                    errorInput.references ? styles.errorInput : styles.input
                  }
                  onChangeText={(e) => {
                    setValues({ ...values, references: e });
                    setErrorInput({ ...errorInput, references: false });
                  }}
                  value={values.references}
                />

                <DropdownMenu
                  style={
                    errorInput.type ? styles.errorDropMenu : styles.dropMenu
                  }
                  rows={rows}
                  selectedValue={values.type}
                  onValueChange={(e) => {
                    setValues({ ...values, type: e });
                    setErrorInput({ ...errorInput, type: false });
                  }}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUpdateIdea}
                >
                  <Text style={styles.textBtn}>Salvar alterações</Text>
                </TouchableOpacity>
              </View>

              <CustomModal
                text="Confira se todos os campos estão preenchidos corretamente"
                error={true}
                modalVisible={isActive.error}
                onPress={() => setIsActive({ ...isActive, error: false })}
              />
              <CustomModal
                text="Valeu! Sua Ideia foi editada com succeso!"
                success={true}
                modalVisible={isActive.succes}
                onPress={() => {
                  setIsActive({ ...isActive, succes: false });
                  navigation.navigate('MyIdeas');
                  clearFields();
                }}
              />
            </KeyboardAwareScrollView>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default EditIdea;
