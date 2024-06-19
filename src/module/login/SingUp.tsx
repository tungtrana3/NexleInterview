import React, { useState, useEffect, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { COLOR, FONT, IMAGE, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import {
  signUpAction,
} from '../../redux/reducer/signup.reducer';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { checkPwd, stringIsEmpty } from '../../constants/Function';
import Loading from '../../components/common/Loading';
import { textStyles } from '../../styles';
import { Checkbox } from '../../components/checkbox/Checkbox';
import * as Progress from 'react-native-progress';
import { regTestEmail } from '../../constants/Regex';

const SignUp = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const signUpData = useAppSelector(state => state.userReducer.loginData);

  const [checkedAge, setCheckedAge] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [pwdStrength, setPwdStrength] = useState({
    pass: false,
    passCase: 0,
    percent: 0,
    color: COLOR.primary,
    strength: ''
  });
  const [errPwd, setErrPwd] = useState('');

  const onChangePassword = (value: string) => {
    if (value.length > 0 && errPwd.length > 0) {
      setErrPwd('');
    }
    let checkPwdStrength = checkPwd(value)
    setPassword(value);
    setPwdStrength(checkPwdStrength);
  };

  const onPressSignUp = () => {
    let { isValid, err } = _onFormValidate();
    if (isValid) {
      dispatch(
        signUpAction({
          email,
          password,
          firstName,
          lastName,
        }),
      );
    } else {
      Alert.alert(err)
    }
  };

  const _onFormValidate = () => {
    let isValid = true;
    let err = ''

    if (stringIsEmpty(lastName)) {
      err = `${STRING.signUpForm.lastName} ${STRING.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(firstName)) {
      err = `${STRING.signUpForm.firstName} ${STRING.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(password)) {
      err = `${STRING.password} ${STRING.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(email)) {
      err = `${STRING.email} ${STRING.valid.notBeBlank}`
      isValid = false;
    } else {
      if (!regTestEmail.test(email)) {
        err = `${STRING.valid.inValid} ${STRING.email} `
        isValid = false;
      }
    }
    return { isValid, err };
  };

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={styles.container}>
        <Image source={IMAGE.bg_login} style={styles.background} />
        <LinearGradient
          colors={['rgba(0, 0, 0,0)', 'rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.form}>
              <Text style={styles.heading}>Let’s get you started!</Text>
              <TextFieldForm
                label={STRING.yourEmail}
                value={email}
                onChangeText={setEmail}
              />
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={STRING.password}
                textType='password'
                value={password}
                onChangeText={onChangePassword}
              />
              {!stringIsEmpty(password) && (<View style={{ marginTop: -16 }}>
                <Progress.Bar
                  progress={pwdStrength.percent}
                  height={1}
                  width={Dimensions.get('screen').width - 48}
                  color={pwdStrength.color}
                  unfilledColor='#F3F3F3'
                  borderWidth={0}
                />
                <Text style={{ color: pwdStrength.color, alignSelf: 'flex-end' }}>{pwdStrength.strength}</Text>
              </View>)}
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={STRING.signUpForm.firstName}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={STRING.signUpForm.lastName}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <SafeAreaView style={styles.bottomView}>
        <Checkbox label='I am over 16 years of age'
          checked={checkedAge}
          onCheck={() => setCheckedAge(!checkedAge)} />
        <View style={styles.termOfServiceView}>
          <Text style={styles.termOfServiceLabel}>
            By clicking Sign Up, you are indicating that you have read and agree to the
            <Text style={[textStyles.smallBold, { color: COLOR.primary }]} onPress={() => { }}> {STRING.termOfService} </Text>
            and
            <Text style={[textStyles.smallBold, { color: COLOR.primary }]} onPress={() => { }}> {STRING.privacyPolicy} </Text>
          </Text>
        </View>
        <View style={styles.signUp}>
          <TouchableOpacity
            disabled
            style={{ flexDirection: 'row' }}>
            <Text style={[textStyles.medium, { color: 'white' }]}>{STRING.signUpForm.signUp}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSignUp}
            style={{ flexDirection: 'row' }}>
            <Image source={IMAGE.ic_next_login} style={styles.icNextSignUp} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {status === Status.loading && <Loading />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    resizeMode: 'cover',
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height * 0.5,
    position: 'absolute'
  },
  linearGradient: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 24,
    width: '100%',
  },
  termOfServiceView: {
    justifyContent: 'center',
    marginVertical: 30,
  },
  termOfServiceLabel: {
    ...textStyles.smallBold,
    color: 'rgba(255, 255,255,0.5)'
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpLabel: {
    color: 'white'
  },
  icNextSignUp: {
    resizeMode: 'cover',
    width: 54,
    height: 54,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 70,
    fontWeight: 400,
    fontFamily: FONT.regular_400
  },
  bottomView:
  {
    backgroundColor: 'black',
    marginHorizontal: 24,
    marginTop: 40,
    marginBottom: 54,
  },
});
