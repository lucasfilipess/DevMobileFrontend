import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import profile1 from '../../../assets/images/profile1.png';
import profile2 from '../../../assets/images/profile2.png';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const idea = route.params.idea;

  return (
    <>
      <View style={styles.container}>
        {idea.profile_picture === 'profile1' && (
          <Image style={styles.profileImage} source={profile1} />
        )}
        {idea.profile_picture === 'profile2' && (
          <Image style={styles.profileImage} source={profile2} />
        )}
        <Text>{idea.user}</Text>
        <Text>{idea.title}</Text>
        <Text>{idea.description}</Text>
      </View>
    </>
  );
}

export default Detail;
