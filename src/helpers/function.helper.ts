import { colors, pwdStrength, regAtLeatOneNumeric, regBothLowerUpercase, regSpecialChar } from "../constants";

export const objectIsNull = (object?: any) => {
  if (object === null || object === undefined || object === '(null)') {
    return true;
  } else {
    return false;
  }
};
export const arrayIsEmpty = (array?: any) => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const stringIsEmpty = (string?: string) => {
  if (objectIsNull(string) || string === '' || string === 'null') {
    return true;
  } else {
    return false;
  }
};
export const checkPwd = (string: string) => {
  let pwdConditions = [regBothLowerUpercase, regAtLeatOneNumeric, regSpecialChar]
  let passCase = 0;
  for (let elem of pwdConditions) {
    let regex = new RegExp(elem);
    if (regex.test(string)) {
      passCase += 1
    }
  }
  return {
    pass: passCase == pwdConditions.length && passCase > 0,
    passCase,
    percent: passCase != 0 ? passCase / pwdConditions.length : 0.1,
    color: pwdStrength[passCase].color,
    strength: pwdStrength[passCase].label,
  }
}