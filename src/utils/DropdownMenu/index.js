import React from 'react';
import { Icon, Picker } from 'native-base';
import styles from './styles';
import { View, Image } from 'react-native';
import profile1 from '../../../assets/images/profile1.png';

function DropdownMenu({ style, rows, selectedValue, onValueChange }) {
  return (
    <>
      <View style={style}>
        <Picker
          mode="dropdown"
          placeholder="Tpo da Ideia"
          iosIcon={<Icon name="arrow-down" />}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.text}
        >
          {rows.map((item, index) => (
            <Picker.Item
              style={styles.text}
              key={index}
              label={item.data.label}
              // label={<Image src={profile1} />}
              value={item.data.value}
            />
          ))}
        </Picker>
      </View>
    </>
  );
}
export default DropdownMenu;
