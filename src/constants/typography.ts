import { TextStyle } from 'react-native';
import { fonts, colors } from '.';

export const typography = {
  heading: {
    sm: {
      color: colors.text[900],
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 20,
      fontFamily: fonts.regular
    } as TextStyle,
    md: {
      color: colors.text[900],
      fontSize: 20,
      fontWeight: "700",
      lineHeight: 25,
      fontFamily: fonts.regular
    } as TextStyle,
    lg: {
      color: colors.text[900],
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 20,
      fontFamily: fonts.regular
    } as TextStyle,
    xl: {
      color: colors.text[900],
      fontSize: 30,
      fontWeight: "700",
      lineHeight: 37.5,
      fontFamily: fonts.regular
    } as TextStyle,
  },
  regular: {
    xs: {
      color: colors.text[900],
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 18,
      fontFamily: fonts.regular
    } as TextStyle,
    sm: {
      color: colors.text[900],
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 21,
      fontFamily: fonts.regular
    } as TextStyle,
    md: {
      color: colors.text[900],
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      fontFamily: fonts.regular
    } as TextStyle,
    lg: {
      color: colors.text[900],
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 27,
      fontFamily: fonts.regular
    } as TextStyle,
    xl: {
      color: colors.text[900],
      fontSize: 20,
      fontWeight: "400",
      lineHeight: 30,
      fontFamily: fonts.regular
    } as TextStyle,
  },
  medium: {
    xs: {
      color: colors.text[900],
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 18,
      fontFamily: fonts.md
    } as TextStyle,
    sm: {
      color: colors.text[900],
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 21,
      fontFamily: fonts.md
    } as TextStyle,
    md: {
      color: colors.text[900],
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 24,
      fontFamily: fonts.md
    } as TextStyle,
    lg: {
      color: colors.text[900],
      fontSize: 18,
      fontWeight: "500",
      lineHeight: 27,
      fontFamily: fonts.md
    } as TextStyle,
    xl: {
      color: colors.text[900],
      fontSize: 20,
      fontWeight: "500",
      lineHeight: 30,
      fontFamily: fonts.md
    } as TextStyle,
  },
  bold: {
    lg: {
      color: colors.text[900],
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 27,
      fontFamily: fonts.exBold
    } as TextStyle,
    xl: {
      color: colors.text[900],
      fontSize: 20,
      fontWeight: "700",
      lineHeight: 30,
      fontFamily: fonts.exBold
    } as TextStyle,
  },
};