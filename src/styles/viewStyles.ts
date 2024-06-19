import { ImageStyle, Platform, ViewStyle } from 'react-native';

interface ViewStylesProps {
  flex1: ViewStyle;
  paddingHorizontalView: number;
  paddingVerticalView: number;
  paddingHorizontalItem: number;
  paddingVerticalItem: number;

  borderRadiusView: number;
  borderRadiusCard: number;
  borderRadiusForm: number;

  iconSize: number;
  iconMiniSize: number;
  iconNormalSize: number;

  shadow: ViewStyle;
  sizeTagExists: number;
  paddingBottomScrollView: number;
}
interface IconStylesProps {
  icon14px: ImageStyle;
}
export const viewStyles: ViewStylesProps = {
  paddingHorizontalView: 20,
  paddingVerticalView: 16,
  paddingVerticalItem: 16,
  paddingHorizontalItem: 16,
  borderRadiusView: 20,
  borderRadiusCard: 14,
  borderRadiusForm: 4,
  iconSize: 28,
  iconMiniSize: 14,
  iconNormalSize: 24,
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    elevation: Platform.OS === 'android' ? 5 : 1,
  },
  paddingBottomScrollView: 34 * 2,
  sizeTagExists: 10,
  flex1: { flex: 1 },
};
export const iconStyle: IconStylesProps = {
  icon14px: { width: 14, height: 14, resizeMode: 'contain' },
};
