import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },

  profileImage: {
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },

  title: {
    // flex: ,
    width: 10,
    // backgroundColor: 'red',
  },

  image: {
    // flex: 1,
    height: 40,
    width: 40,
    // marginVertical: 30,
    resizeMode: 'contain',
  },

  right: {
    // flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  cardItem: {
    justifyContent: 'space-between',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#000',
    // padding: 10,
    // borderRadius: 8,
  },

  detailsButtonText: {
    // color: '#fff',
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  body: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  card: {
    // borderColor: '#000',
    backgroundColor: 'red',
  },
  menuContainer: {
    marginTop: 50,

  },
  titleMenu: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center'
  },
});

