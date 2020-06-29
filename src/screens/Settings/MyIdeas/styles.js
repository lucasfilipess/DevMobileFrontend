import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  tabHeading: {
    backgroundColor: '#fff',
  },

  titleMenu: {
    color: '#000',
  },
  back: {
    marginLeft: 10,
  },
  profileImage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },

  title: {
    width: 10,
  },

  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },

  right: {
    justifyContent: 'flex-end',
  },
  cardItem: {
    justifyContent: 'space-between',
  },

  optionButton: {
    marginHorizontal: 30,
  },

  optionButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  body: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
});
