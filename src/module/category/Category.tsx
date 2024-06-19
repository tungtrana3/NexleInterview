import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { COLOR, FONT, IMAGE, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
// import {
//   logOutAction,
//   CategoryAction,
// } from '../../redux/reducer/user.reducer';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { checkPwd, stringIsEmpty } from '../../constants/Function';
import Loading from '../../components/common/Loading';
import { textStyles } from '../../styles';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { MainRoutes } from '../../routes/routes';
import { Header } from '../../components/header';

const Category = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  // const signInData = useAppSelector(state => state.userReducer.CategoryData);

  const [rememberPwd, setCheckRemmberPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
      <ImageBackground
        source={IMAGE.bg_category}
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0,0)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <Header title={''}
           onPressBack={() => navigation.goBack()} 
          rightBtn={<TouchableOpacity style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
            <Text style={[textStyles.normal, { color: 'white' }]}>Done</Text>
          </TouchableOpacity>} ></Header>
          <View style={styles.heardingView}>
            <Text style={styles.heading}>Wellcome to Nexle Entrance Test</Text>
            <Text style={[textStyles.normal, { color: 'white' }]}> Please select categories what you would like to see on your feed. You can set this later on Filter.</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <FlatList
        style={styles.listCategorys}
        numColumns={3}
        contentContainerStyle={styles.listCategorysContainer}
        showsVerticalScrollIndicator={false}
        data={Array.from(Array(50).keys())}
        renderItem={({ item, index }) => {
          if (index % 5 != 0) {
            return (
              <TouchableOpacity
                style={styles.category}>
                <Text style={styles.categoryLabel}>{item}</Text>
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity style={styles.category}>
              <LinearGradient
                style={styles.categoryChoosen}
                colors={['#8A00FF', '#8A32A9']}>
                <Text style={styles.categoryLabel}>{item}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )
        }} />
      {status === Status.loading && <Loading />}
    </View>
  );
};

export default Category;

const screenHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center'
  },
  background: {
    resizeMode: 'cover',
    top: 0,
    width: '100%',
    height: screenHeight,
    position: 'absolute',
    overflow: 'hidden'
  },
  linearGradient: {
    height: screenHeight * 0.4,
    width: '100%',
  },
  heardingView: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    marginBottom: 20
  },
  heading: {
    color: 'white',
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 20,
    fontWeight: 400,
    fontFamily: FONT.regular_400
  },
  listCategorys: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    marginTop: screenHeight * 0.4,
  },
  listCategorysContainer: {
    paddingBottom: 50,
  },
  category: {
    flex: 1,
    margin: 4,
    alignSelf: 'center',
    maxWidth: '31%',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(225,225,225,0.12)',
    overflow: 'hidden'
  },
  categoryChoosen: {
    flex: 1,
    borderRadius: 8,
  },
  categoryLabel: {
    ...textStyles.medium,
    padding: 24,
    alignSelf: 'center',
    color: 'rgba(255,255,255, 0.8)'

  }
});
