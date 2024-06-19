import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { textStyles, viewStyles } from '../../styles';
import { COLOR, IMAGE, STRING } from '../../constants';

interface CheckboxProps {
  label: string;
  checked: boolean;
  style?: ViewStyle;
  duration?: number,
  onCheck?: () => void;
}
export const Checkbox = ({
  checked,
  label,
  style,
  onCheck,
}: CheckboxProps) => {
  const [isChecked, secChecked] = useState<boolean>(false);

  useEffect(() => {
    secChecked(checked);
  }, [checked]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => { secChecked(!isChecked) }}>
        <Image
          style={styles.ic_checkbox}
          source={
            isChecked
              ? IMAGE.ic_checkbox_checked
              : IMAGE.ic_checkbox
          }
        />
      <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...textStyles.normal,
    color: 'white',
  },
  ic_checkbox: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
});
