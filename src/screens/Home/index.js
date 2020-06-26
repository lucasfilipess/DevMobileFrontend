import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import {
  AsyncStorage,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  View,
  Fab,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../utils/Modal';
import api from '../../service/api';
import book from '../../../assets/images/book.png';
import controller from '../../../assets/images/controller.png';
import headphone from '../../../assets/images/headphone.png';
import medicine from '../../../assets/images/medicine.png';
import profile1 from '../../../assets/images/profile1.png';
import profile2 from '../../../assets/images/profile2.png';
import profile3 from '../../../assets/images/profile3.png';
import profile4 from '../../../assets/images/profile4.png';
import profile5 from '../../../assets/images/profile5.png';
import video from '../../../assets/images/video.png';
import { UserContext } from '../../store';

function Home() {
  useEffect(() => {
    loadIdeas();
    retrieveData();
  }, []);

  const navigation = useNavigation();
  const [ideas, setIdeas] = useState([]);
  const [like, setLike] = useState([]);
  const [isActive, setIsActive] = useState({
    error: false,
  });
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useContext(UserContext);

  async function loadIdeas() {
    try {
      await api
        .get(`ideas/${user.filter}`)
        .then((response) => setIdeas(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRefresh() {
    setRefresh(true);
    try {
      await api.get(`ideas/${user.filter}`).then((response) => {
        setIdeas(response.data);
        setRefresh(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike(id) {
    const data = {};
    let verify = 0;
    for (let i = 0; i < like.length; i++) {
      if (like[i] === id) {
        verify++;
      }
    }
    if (verify === 0) {
      setLike([...like, id]);
      try {
        await api
          .put(`like/${id}`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => loadIdeas());
      } catch (error) {
        console.log(error);
      }
    } else {
      setLike(like.filter((item) => item !== id));
      try {
        await api
          .put(`deslike/${id}`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => loadIdeas());
      } catch (error) {
        console.log(error);
      }
    }
  }

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

  async function handleLink(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        setIsActive({ ...isActive, error: true });
      }
    });
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={ideas}
          onEndReached={loadIdeas}
          onRefresh={() => handleRefresh()}
          refreshing={refresh}
          onEndReachedThreshold={0.2}
          keyExtractor={(ideas) => String(ideas.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: idea }) => (
            <Card key={idea.id}>
              <CardItem style={styles.cardItem}>
                {idea.profile_picture === 'profile1' && (
                  <Image style={styles.profileImage} source={profile1} />
                )}
                {idea.profile_picture === 'profile2' && (
                  <Image style={styles.profileImage} source={profile2} />
                )}
                {idea.profile_picture === 'profile3' && (
                  <Image style={styles.profileImage} source={profile3} />
                )}
                {idea.profile_picture === 'profile4' && (
                  <Image style={styles.profileImage} source={profile4} />
                )}
                {idea.profile_picture === 'profile5' && (
                  <Image style={styles.profileImage} source={profile5} />
                )}
                <Body style={styles.title}>
                  <Text>{idea.title}</Text>
                  <Text note>{idea.user}</Text>
                </Body>
                <View style={styles.right}>
                  {idea.type === 'study' && (
                    <Image style={styles.image} source={book} />
                  )}
                  {idea.type === 'video' && (
                    <Image style={styles.image} source={video} />
                  )}
                  {idea.type === 'game' && (
                    <Image style={styles.image} source={controller} />
                  )}
                  {idea.type === 'music' && (
                    <Image style={styles.image} source={headphone} />
                  )}
                  {idea.type === 'health' && (
                    <Image style={styles.image} source={medicine} />
                  )}
                </View>
              </CardItem>
              <CardItem cardBody style={styles.body}>
                <Text>{idea.description}</Text>
                <CustomModal
                  text="Não foi possível abrir o link"
                  error={true}
                  modalVisible={isActive.error}
                  onPress={() => setIsActive({ ...isActive, error: false })}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <TouchableOpacity onPress={() => handleLike(idea.id)}>
                    <AntDesign name="heart" size={28} color="#000" />
                  </TouchableOpacity>
                  <Text>{idea.likes}</Text>
                </Left>
                <Right>
                  {idea.references && (
                    <TouchableOpacity
                      style={styles.detailsButton}
                      onPress={() => handleLink(idea.references)}
                    >
                      <Text style={styles.detailsButtonText}>
                        Ver mais detalhes
                      </Text>
                    </TouchableOpacity>
                  )}
                </Right>
              </CardItem>
            </Card>
          )}
        />
      </View>
      <Fab
        direction="up"
        position="bottomRight"
        style={{ backgroundColor: '#000' }}
        onPress={() => navigation.navigate('Filter')}
      >
        <FontAwesome name="filter" size={24} color="white" />
      </Fab>
    </>
  );
}
export default Home;
