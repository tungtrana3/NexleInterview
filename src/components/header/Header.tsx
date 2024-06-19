import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR, IMAGE } from '../../constants';
import { textStyles } from '../../styles';

interface HeaderProps {
  style?: Object;
  onPressBack?: Function;
  rightBtn?: React.ReactNode;
  title: string;
  subTitle?: string;
}

export const Header = ({
  title,
  subTitle,
  onPressBack,
  rightBtn,
  style,
}: HeaderProps) => {
  return (
    <SafeAreaView style={[styles.header, style ? style : {}]}>
      {onPressBack ? (
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => {
            onPressBack();
          }}>
          <Image source={IMAGE.ic_arrow_back} style={styles.ic_back} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btn_view} />
      )}
      <View style={styles.title_view}>
        <Text style={[textStyles.medium, { color: 'white' }]}>{title}</Text>
        {subTitle !== undefined && (
          <Text style={textStyles.note}>{subTitle}</Text>
        )}
      </View>
      {rightBtn && rightBtn}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    justifyContent: 'space-between'
  },
  btn_view: {
    width: 40,
  },
  btn: {
    justifyContent: 'center',
  },
  back_btn: {
    padding: 24,
  },
  ic_back: {
    width: 8,
    height: 14,
    resizeMode: 'cover',
  },
  title_view: {
    width: Dimensions.get('screen').width - 80 * 2,
    alignItems: 'center',
    padding: 14,
  },
});
