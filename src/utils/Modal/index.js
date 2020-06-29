import React from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

function CustomModal({ text, modalVisible, success, error, onPress }) {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {error && (
              <MaterialIcons
                style={styles.modalIcon}
                name="error"
                size={50}
                color="#000"
              />
            )}
            {success && <AntDesign name="checkcircle" size={42} color="#000" />}

            <Text style={styles.modalText}>{text}</Text>

            <TouchableHighlight style={styles.openButton} onPress={onPress}>
              <Text style={styles.textStyle}>ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;

export function OptionsModal({
  text,
  modalVisible,
  success,
  error,
  onPressN,
  onPressT,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {error && (
              <MaterialIcons
                style={styles.modalIcon}
                name="error"
                size={50}
                color="#000"
              />
            )}
            {success && <AntDesign name="checkcircle" size={42} color="#000" />}

            <Text style={styles.modalText}>{text}</Text>

            <View style={styles.optionsBtn}>
              <TouchableHighlight style={styles.openButton} onPress={onPressN}>
                <Text style={styles.textStyle}>não</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.openButton} onPress={onPressT}>
                <Text style={styles.textStyle}>sim</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
