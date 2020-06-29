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

  tabHeading: {
    backgroundColor: '#fff',
  },

  titleMenu: {
    color: '#000',
  },
  input_group: {
    marginBottom: 50,
  },
  back: {
    marginLeft: 10,
  },
  input: {
    height: 45,
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
    height: 45,
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
    height: 47,
    marginHorizontal: 10,
    width: window.width - 30,
    borderBottomWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    paddingLeft: 5,
    color: '#000',
    fontSize: 18,
  },

  profile: {
    width: 80,
    height: 80,
    marginTop: 100,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
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
  register: {
    borderRadius: 8,
    borderColor: '#000',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 10,
    marginTop: 10,
  },
  textRegister: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
