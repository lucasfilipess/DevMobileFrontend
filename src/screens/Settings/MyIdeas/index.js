import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import api from '../../../service/api';
import {
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Left,
  Right,
  Fab,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CustomModal from '../../../utils/Modal';
import book from '../../../../assets/images/book.png';
import controller from '../../../../assets/images/controller.png';
import headphone from '../../../../assets/images/headphone.png';
import medicine from '../../../../assets/images/medicine.png';
import profile1 from '../../../../assets/images/profile1.png';
import profile2 from '../../../../assets/images/profile2.png';
import profile3 from '../../../../assets/images/profile3.png';
import profile4 from '../../../../assets/images/profile4.png';
import profile5 from '../../../../assets/images/profile5.png';
import video from '../../../../assets/images/video.png';

function MyIdeas() {
  const route = useRoute();
  const token = route.params.token;
  const [ideas, setIdeas] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isActive, setIsActive] = useState({
    error: false,
  });

  useEffect(() => {
    async function getIdeas() {
      try {
        await api.get('my-ideas', {
          headers: {
            authorization: token
          }
        }).then(response => {
          console.log(response.data);

          setIdeas(response.data)
        })
      } catch (error) {
        console.log(error);

      }
    }
    getIdeas();
  }, [])

  async function handleRefresh() {
    // setRefresh(true);
    try {
      await api.get('my-ideas', {
        headers: {
          authorization: token
        }
      }).then(response => {
        console.log(response.data);

        setIdeas(response.data)
      })
    } catch (error) {
      console.log(error);

    }
    // setRefresh(false);
  }

  async function handleUpdade() {

  }

  async function handleDelete(id) {
    try {
      await api.delete(`ideas/delete/${id}`, {
        headers: {
          authorization: token
        }
      }).then(response => {
        console.log(response);
        handleRefresh();
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    < >
      <View style={styles.menuContainer}>
        <Text style={styles.titleMenu}>
          Minhas Ideias
        </Text>
        <FlatList
          data={ideas}
          onEndReached={handleRefresh}
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
                  <TouchableOpacity onPress={() => handleDelete(idea.id)}>
                    <Text style={styles.detailsButtonText}>
                      Excluir</Text>
                  </TouchableOpacity>

                </Left>
                <Right>
                  {idea.references && (
                    <TouchableOpacity
                      style={styles.detailsButton}
                      onPress={() => handleUpdade(idea.id)}
                    >
                      <Text style={styles.detailsButtonText}>
                        Editar
                      </Text>
                    </TouchableOpacity>
                  )}
                </Right>
              </CardItem>
            </Card>
          )}
        />
      </View>
    </>
  );
}

export default MyIdeas;
