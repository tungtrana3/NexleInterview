import { ColorValue } from "react-native";
import { colors } from "./colors";

interface strengthProps {
    label: string,
    color: ColorValue,
}
export interface PwdStrengthProps {
    [key: number]: strengthProps,
}
export const pwdStrength: PwdStrengthProps = {
    3: {
        label: "Strong",
        color: "#91E2B7",
    },
    2: {
        label: "Good",
        color: colors.primary[400],
    },
    1: {
        label: "Fail",
        color: "#E3A063",
    },
    0: {
        label: "Weak",
        color: "#E05151",
    }
}
