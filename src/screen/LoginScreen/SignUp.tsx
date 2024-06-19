import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import { colors, images, strings, typography } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import {
  resetSignUpAction,
  signUpAction,
} from '../../redux/reducer/signup.reducer';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { checkPwd, stringIsEmpty } from '../../helpers/function.helper';
import Loading from '../../components/common/Loading';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles';
import { Checkbox } from '../../components/checkbox/Checkbox';
import * as Progress from 'react-native-progress';
import { regTestEmail } from '../../constants/regexs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Header } from '../../components/header';

const SignUp = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.signUpReducer.status);
  const message = useAppSelector(state => state.signUpReducer.msg);

  const [checkedAge, setCheckedAge] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [pwdStrength, setPwdStrength] = useState({
    pass: false,
    passCase: 0,
    percent: 0,
    color: colors.primary[400],
    strength: ''
  });
  const [errPwd, setErrPwd] = useState('');

  useEffect(() => {
    if (status === Status.success && message !== '') {
      Alert.alert(strings.popup.notice, message, [
        {
          text: 'Ok',
          onPress: () => { navigation.goBack() },
        },
      ]);
    }
    if (status === Status.error && message !== '') {
      Alert.alert(strings.popup.error, message, [
        {
          text: 'Ok',
          onPress: () => { },
        },
      ]);
    }
  }, [status, message])
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(resetSignUpAction());
      };
    }, [dispatch]),
  );
  const _onFormValidate = () => {
    let isValid = true;
    let err = ''

    if (stringIsEmpty(lastName)) {
      err = `${strings.signUpForm.lastName} ${strings.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(firstName)) {
      err = `${strings.signUpForm.firstName} ${strings.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(password)) {
      err = `${strings.password} ${strings.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(email)) {
      err = `${strings.email} ${strings.valid.notBeBlank}`
      isValid = false;
    } else {
      if (!regTestEmail.test(email)) {
        err = `${strings.valid.inValid} ${strings.email} `
        isValid = false;
      }
    }
    return { isValid, err };
  };
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
      Alert.alert(strings.popup.error, err)
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={styles.container}>
        <ImageBackground source={images.bg_login} style={styles.background} />
        <LinearGradient
          colors={['rgba(0, 0, 0,0)', 'rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <Header title={''}
            onPressBack={() => navigation.goBack()}
          />
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.form}>
              <Text style={styles.heading}>Let’s get you started!</Text>
              <TextFieldForm
                label={strings.yourEmail}
                value={email}
                onChangeText={setEmail}
              />
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={strings.password}
                textType='password'
                value={password}
                onChangeText={onChangePassword}
              />
              {!stringIsEmpty(password) && (<View style={{ marginTop: -16 }}>
                <Progress.Bar
                  progress={pwdStrength.percent}
                  height={1}
                  width={SCREEN_WIDTH - 48}
                  color={pwdStrength.color}
                  unfilledColor='#F3F3F3'
                  borderWidth={0}
                />
                <Text style={{ color: pwdStrength.color, alignSelf: 'flex-end' }}>{pwdStrength.strength}</Text>
              </View>)}
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={strings.signUpForm.firstName}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={strings.signUpForm.lastName}
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
            <Text style={[typography.medium.md, { color: colors.primary[400] }]} onPress={() => { }}> {strings.termOfService} </Text>
            and
            <Text style={[typography.medium.md, { color: colors.primary[400] }]} onPress={() => { }}> {strings.privacyPolicy} </Text>
          </Text>
        </View>
        <View style={styles.signUp}>
          <TouchableOpacity
            disabled
            style={{ flexDirection: 'row' }}>
            <Text style={typography.medium.md}>{strings.signUpForm.signUp}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSignUp}
            style={{ flexDirection: 'row' }}>
            <Image source={images.ic_next_login} style={styles.icNextSignUp} />
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
    height: SCREEN_HEIGHT * 0.5,
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
    ...typography.regular.sm,
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
    ...typography.heading.md,
    marginBottom: 70,
  },
  bottomView:
  {
    backgroundColor: 'black',
    marginHorizontal: 24,
    marginTop: 40,
    marginBottom: 54,
  },
});
