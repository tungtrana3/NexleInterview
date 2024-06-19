import { StyleSheet, TextStyle } from 'react-native';
import { FONT } from '../constants';

interface TextStylesProps {
  verySmall: TextStyle;
  verySmallBold: TextStyle;

  small: TextStyle;
  smallBold: TextStyle;

  normal: TextStyle;
  normalBold: TextStyle;

  medium: TextStyle;
  mediumBold: TextStyle;
  normalMedium: TextStyle;
  note: TextStyle;
}

export const textStyles: TextStylesProps = StyleSheet.create({
  verySmall: {
    fontSize: 10,
    fontFamily: FONT.regular_400,
    color: "black",
    lineHeight: 22,
  },
  verySmallBold: {
    fontSize: 10,
    fontFamily: FONT.bold_700,
    color: "black",
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    fontFamily: FONT.regular_400,
    color: "#262626",
    lineHeight: 22,
  },
  smallBold: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: FONT.bold_700,
    color: "#262626",
    lineHeight: 22,
  },
  normal: {
    fontSize: 14,
    fontFamily: FONT.regular_400,
    fontWeight: 400,
    color: "black",
    lineHeight: 22,
  },
  normalMedium: {
    fontSize: 14,
    fontFamily: FONT.medium_500,
    fontWeight: 500,
    color: "black",
    lineHeight: 22,
  },
  normalBold: {
    fontSize: 14,
    fontFamily: FONT.bold_700,
    fontWeight: 700,
    color: "black",
    lineHeight: 22,
  },
  medium: {
    fontSize: 16,
    fontFamily: FONT.medium_500,
    fontWeight: 500,
    color: "black",
    lineHeight: 24,
  },
  mediumBold: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: FONT.bold_700,
    color: "black",
    lineHeight: 22,
  },
  note: {
    fontFamily: FONT.regular_400,
    color: "#8C8C8C",
    fontSize: 12,
    lineHeight: 16,
  },
});
