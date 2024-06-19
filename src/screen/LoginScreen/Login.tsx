import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import {  colors,  images, strings, typography } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import {
  logOutAction,
  loginAction,
} from '../../redux/reducer/user.reducer';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { stringIsEmpty } from '../../helpers/function.helper';
import Loading from '../../components/common/Loading';
import { SCREEN_HEIGHT } from '../../styles';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { MainRoutes } from '../../routes/routes';

const Login = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.msg);
  // const loginData = useAppSelector(state => state.userReducer.loginData);

  const [rememberPwd, setCheckRemmberPwd] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('xuanha@gmail.com');
  const [password, setPassword] = useState('123');

  const _onPresssignIn = () => {
    let isValid = _onValidate();
    if (isValid) {
      dispatch(
        loginAction({
          email,
          password
        }),
      );
    }
  };
  useEffect(() => {
    if (status === Status.success) {
      if (status === Status.success && message !== '') {
        return
        Alert.alert(strings.popup.notice, message, [
          {
            text: 'Ok',
            onPress: () => { },
          },
        ]);
      }
    }
    if (status === Status.error && message !== '') {
      Alert.alert(strings.popup.error, message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(logOutAction());
          },
        },
      ]);
    }
  }, [status, message])
  const _onValidate = () => {
    let isValid = true;
    let err = ''
    if (stringIsEmpty(email)) {
      err = `${strings.email} ${strings.valid.notBeBlank}`
      isValid = false;
    }
    if (stringIsEmpty(password)) {
      err = `${strings.password} ${strings.valid.notBeBlank}`
      isValid = false;
    }
    if (isValid == false) {
      Alert.alert(strings.popup.error, err)
    }
    return isValid;
  };
  const _onPressCreateAccount = () => {
    navigation.navigate(MainRoutes.SignUp)
  }
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={styles.container}>
        <Image source={images.bg_login} style={styles.background} />
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
                label={strings.yourEmail}
                value={email}
                onChangeText={setEmail}
              />
              <TextFieldForm
                style={{ marginTop: 26 }}
                label={strings.password}
                textType='password'
                value={password}
                onChangeText={setPassword}
              />
              <Checkbox label='Remember me'
                checked={rememberPwd}
                onCheck={() => setCheckRemmberPwd(!rememberPwd)} />
              <Text style={styles.createAccountLable}>
                New to Nexle?
                <Text style={[typography.bold.lg, { color: colors.primary[400] }]} onPress={_onPressCreateAccount}> {strings.createAccount} </Text>
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <SafeAreaView style={styles.bottomView}>
        <View style={styles.signIn}>
          <TouchableOpacity
            disabled
            style={{ flexDirection: 'row' }}>
            <Text style={typography.medium.md}>{strings.signIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_onPresssignIn}
            style={{ flexDirection: 'row' }}>
            <Image source={images.ic_next_login} style={styles.icNext} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {status === Status.loading && <Loading />}
    </View>
  );
};

export default Login;

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
  createAccountLable: {
    ...typography.regular.md,
    alignSelf: 'center',
    marginTop: 24,
    color: 'rgba(255, 255,255,0.5)'
  },
  signIn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInLabel: {
    color: 'white'
  },
  icNext: {
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
