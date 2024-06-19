const extendedColors = {
  cyan: {
    50: "#ecfeff",
    500: "#06b6d4",
    900: "#164e63",
  },
  gray: {
    50: "#fafafa",
    200: "#e5e5e5",
    400: "#a3a3a3",
    600: "#525252",
    900: "#171717",
  },
  blue: {
    50: "#c1cbff",
    200: "#8398ff",
    400: "#647fff",
    600: "#5065cc",
    900: "#283266",
  },
  white: "#ffffff",
  black: "#000000",
};

const foundationColors = {
  primary: {
    50: extendedColors.blue[50],
    400: extendedColors.blue[400],
    600: extendedColors.blue[600],
    900: extendedColors.blue[900],
  },
  secondary: {
    50: extendedColors.cyan[50],
    500: extendedColors.cyan[500],
    900: extendedColors.cyan[900],
  },
  muted: {
    50: extendedColors.gray[50],
    200: extendedColors.gray[200],
    400: extendedColors.gray[400],
    600: extendedColors.gray[600],
    900: extendedColors.gray[900],
  },
  text: {
    50: extendedColors.white,
    200: extendedColors.white,
    400: extendedColors.white,
    600: extendedColors.white,
    900: extendedColors.white,
  },
};
export const colors = {
  ...extendedColors,
  ...foundationColors,
};