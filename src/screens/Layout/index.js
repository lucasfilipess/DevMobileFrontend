import React, { useState, useEffect, useContext } from 'react';
import styles from './styles';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {
  Container,
  Header,
  Right,
  Body,
  Title,
  Icon,
  View,
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import Home from '../Home';
import NewIdea from '../NewIdea';
import Settings from '../Settings';
import { UserContext } from '../../store';

import profile1 from '../../../assets/images/profile1.png';
import profile2 from '../../../assets/images/profile2.png';
import profile3 from '../../../assets/images/profile3.png';
import profile4 from '../../../assets/images/profile4.png';
import profile5 from '../../../assets/images/profile5.png';

function Layout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);

  const [asyncStorage, setAsyncStorage] = useState({
    name: '',
    profile_picture: '',
  });
  useEffect(() => {
    getFonts();
    retrieveData();
  }, []);
  async function getFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setLoading(false);
  }
  async function retrieveData() {
    try {
      const name = await AsyncStorage.getItem('name');
      const profile_picture = await AsyncStorage.getItem('profile_picture');
      if (name && profile_picture !== null) {
        setAsyncStorage((e) => ({ ...e, name: name }));
        setAsyncStorage((e) => ({ ...e, profile_picture: profile_picture }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <Root>
          <AppLoading />
        </Root>
      ) : (
        <Container>
          <Header androidStatusBarColor="#000" style={styles.header} hasTabs>
            <Body>
              <Title style={styles.name}>{user.name}</Title>
            </Body>
            <Right>
              {user.picture === 'profile1' && (
                <Image style={styles.image} source={profile1} />
              )}
              {user.picture === 'profile2' && (
                <Image style={styles.image} source={profile2} />
              )}
              {user.picture === 'profile3' && (
                <Image style={styles.image} source={profile3} />
              )}
              {user.picture === 'profile4' && (
                <Image style={styles.image} source={profile4} />
              )}
              {user.picture === 'profile5' && (
                <Image style={styles.image} source={profile5} />
              )}
            </Right>
          </Header>
          <View style={styles.container}>
            <Tabs>
              <Tab
                heading={
                  <TabHeading style={styles.tabHeading}>
                    <Icon type="FontAwesome" name="home" style={styles.icons} />
                  </TabHeading>
                }
              >
                <Home />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={styles.tabHeading}>
                    <Icon
                      type="Ionicons"
                      name="ios-add-circle"
                      style={styles.icons}
                    />
                  </TabHeading>
                }
              >
                <NewIdea />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={styles.tabHeading}>
                    <Icon type="FontAwesome" name="gear" style={styles.icons} />
                  </TabHeading>
                }
              >
                <Settings />
              </Tab>
            </Tabs>
          </View>
        </Container>
      )}
    </>
  );
}

export default Layout;
