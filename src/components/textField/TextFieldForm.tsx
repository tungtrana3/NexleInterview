import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextInput,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Dimensions,
} from 'react-native';
import { textStyles, viewStyles } from '../../styles';
import { COLOR, IMAGE, STRING } from '../../constants';
import { stringIsEmpty } from '../../constants/Function';

interface TextFieldFormProps {
  label?: string;
  value?: any;
  isRequire?: boolean,
  textType?: 'password' | 'number';
  style?: ViewStyle;
  duration?: number,
  onChangeText?: (text: string) => void;
}
export const TextFieldForm = ({
  value,
  label,
  style,
  isRequire,
  textType,
  duration = 300,
  onChangeText,
}: TextFieldFormProps) => {
  const [text, setText] = useState<string>(value);
  const [isShowPwd, setShowPwd] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (textType === 'password') {
      setShowPwd(true);
    }
  }, [textType]);
  useEffect(() => {
    setText(value);
  }, [value]);
  const transY = useRef(new Animated.Value(0));
  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(transY.current, {
      toValue: -30,
      duration,
      useNativeDriver: true
    }).start()
  }
  const handleBlur = () => {
    setIsFocused(false)
    if (stringIsEmpty(text)) {
      Animated.timing(transY.current, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }
  const _onKeyPress = (data: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (data.nativeEvent.key === 'Backspace') {
      setText(text.slice(0, -1));
      onChangeText && onChangeText(text.slice(0, -1));
    return;
    }
    if (data.nativeEvent.key === 'Enter') {
      return;
    }
    if (data.nativeEvent.key === ' ') {
      setText(text + ' ');
      return;
    }
    if (data.nativeEvent.key === 'Tab') {
      return;
    }
    setText(text + data.nativeEvent.key);
    onChangeText && onChangeText(text+ data.nativeEvent.key);
  };

  let borderColor = '#F3F3F3';
  if (!true) {
    borderColor = 'red';
  } else {
    if (isFocused) {
      borderColor = COLOR.primary;
    } else {
      borderColor = '#F3F3F3';
    }
  }

  return (
    <View style={[styles.container, {
      borderBottomColor: borderColor,
      borderBottomWidth: textType == 'password' && !stringIsEmpty(text) ? 0 : 1
    }, style]}>
      <Animated.View style={[styles.lableContainer, { transform: [{ translateY: transY.current }] }]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.require}>{isRequire ? '*' : ''}</Text>
      </Animated.View>
      <View style={styles.warpTextInput}>
        <TextInput
          value={textType == 'password' && isShowPwd ? '*'.repeat(text.length) : text}
          style={styles.input}
          clearButtonMode='while-editing'
          textContentType="oneTimeCode"
          onKeyPress={txt => _onKeyPress(txt)}
          onBlur={handleBlur}
          onFocus={handleFocus}>
        </TextInput>
        {textType === 'password' && (
          <TouchableOpacity
            style={styles.ic_btn}
            onPress={() => setShowPwd(!isShowPwd)}>
            <Image
              source={isShowPwd ? IMAGE.ic_close_eye : IMAGE.ic_eye}
              style={styles.iconEye}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 16,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: 'white'
  },
  lableContainer: {
    position: 'absolute',
  },
  label: {
    color: 'white',
    opacity: 0.5
  },
  require: {},
  warpTextInput: {
    flexDirection: 'row',
  },
  ic_btn: {
    alignSelf: 'center',
    padding: 10,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  iconEye: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  processPwd: {

  }
});