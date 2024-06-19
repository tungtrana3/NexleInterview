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
} from 'react-native';
import { COLOR, FONT, IMAGE, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import {
  logOutAction,
  loginAction,
} from '../../redux/reducer/user.reducer';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { checkPwd, stringIsEmpty } from '../../constants/Function';
import Loading from '../../components/common/Loading';
import { textStyles } from '../../styles';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { MainRoutes } from '../../routes/routes';

const Login = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const signInData = useAppSelector(state => state.userReducer.loginData);

  const [rememberPwd, setCheckRemmberPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _onPresssignIn = () => {
    return navigation.navigate(MainRoutes.Category)
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

  const _onValidate = () => {
    let isValid = true;
    let err = ''
    if (!stringIsEmpty(email)) {
      err = `${STRING.email} ${STRING.valid.notBeBlank}`
      isValid = false;
    }
    if (!stringIsEmpty(email)) {
      err = `${STRING.password} ${STRING.valid.notBeBlank}`
      isValid = false;
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
                onChangeText={setPassword}
              />
              <Checkbox label='Remember me'
                checked={rememberPwd}
                onCheck={() => setCheckRemmberPwd(!rememberPwd)} />
              <Text style={styles.createAccountLable}>
                New to Nexle?
                <Text style={[textStyles.normalBold, { color: COLOR.primary }]} onPress={_onPressCreateAccount}> {STRING.createAccount} </Text>
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
            <Text style={[textStyles.medium, { color: 'white' }]}>{STRING.signIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_onPresssignIn}
            style={{ flexDirection: 'row' }}>
            <Image source={IMAGE.ic_next_login} style={styles.icNext} />
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
  createAccountLable: {
    alignSelf: 'center',
    ...textStyles.normal,
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
