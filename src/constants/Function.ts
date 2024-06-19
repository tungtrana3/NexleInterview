import { COLOR } from "./Color";

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
  let pwdConditions = [
    {
      regex: '(?=.*[a-z])(?=.*[A-Z])',
      lable: 'Contains both lowercase and uppercase letters',
    },
    {
      regex: '[0-9]+',
      lable: 'Contains at least one numeric character',
    },
    {
      regex: '[^A-Za-z0-9]',
      lable: 'Contains special characters',
    }
  ]
  let passCase = 0;
  let failCase = '';
  for (let elem of pwdConditions) {
    let regex = new RegExp(elem.regex);
    if (regex.test(string)) {
      passCase += 1
    } else {
      failCase = elem.lable
    }
  }
  return {
    pass: passCase == pwdConditions.length && passCase > 0,
    passCase,
    failCase,
    percent: pwdConditions.length != 0 ? passCase / pwdConditions.length : 0,
    color: passCase == 3 ? '#91E2B7' :
      passCase == 2 ? COLOR.primary :
        passCase == 1 ? '#E3A063' : '#E05151',
    strength: passCase == 3 ? 'Strong' :
      passCase == 2 ? 'Good' :
        passCase == 1 ? 'Fair' : 'Weak'
  }
}