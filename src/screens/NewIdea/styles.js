import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    width: 250,
    height: 140,
    marginTop: 100,
  },

  input_group: {
    marginBottom: 50,
  },

  input: {
    height: 50,
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    borderBottomWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    paddingLeft: 15,
    color: '#000',
  },

  errorInput: {
    height: 50,
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    borderBottomWidth: 2,
    borderColor: 'red',
    marginTop: 10,
    paddingLeft: 15,
    color: '#000',
  },

  dropMenu: {
    height: 50,
    marginHorizontal: 10,
    width: window.width - 30,
    borderBottomWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    paddingLeft: 5,
    color: '#000',
    fontSize: 18,
  },

  errorDropMenu: {
    height: 50,
    marginHorizontal: 10,
    width: window.width - 30,
    borderBottomWidth: 2,
    borderColor: 'red',
    marginTop: 10,
    paddingLeft: 5,
    color: '#000',
    fontSize: 18,
  },

  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 10,
  },
  textBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
