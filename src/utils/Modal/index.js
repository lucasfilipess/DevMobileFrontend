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

            <TouchableHighlight
              style={styles.openButton}
              onPress={onPress}
              // onPress={() => {
              //   setModalVisible(!modalVisible);
              // }}
            >
              <Text style={styles.textStyle}>ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;
