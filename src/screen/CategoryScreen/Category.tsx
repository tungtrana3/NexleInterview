import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  ListRenderItem,
  TouchableOpacity,
  Alert
} from 'react-native';
import { images, strings, typography } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import { MainNavigationProp } from '../../routes/type';
import Loading from '../../components/common/Loading';
import { SCREEN_HEIGHT } from '../../styles';
import { Header } from '../../components/header';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCategoryAction,
  resetCategoryAction,
} from '../../redux/reducer/category.reducer';
import { NormalizedFormListItem } from './CategoryItem';

const renderItem: ListRenderItem<string> = ({ item: categoryId }) => (
  <NormalizedFormListItem categoryId={categoryId} />
);
const Category = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.msg);

  const categoriesIdsList = useAppSelector(state => state.categoryReducer.dataIdsList);
  const categoriesById = useAppSelector(state => state.categoryReducer.dataById);
  const loginData = useAppSelector(state => state.userReducer.loginData);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCategoryAction(`${loginData?.user.id}`))
      return () => {
        dispatch(resetCategoryAction());
      };
    }, [dispatch]),
  );
  const saveLocal = async () => {
    let idsSelected = categoriesIdsList.filter((id) => categoriesById[id]?.selected)
    try {
      await AsyncStorage.setItem(`${loginData?.user.id}`, JSON.stringify({ idsSelected }));
      let listIdsSelected = await AsyncStorage.getItem(`${loginData?.user.id}`)
      Alert.alert(strings.popup.notice, "Save categories success!")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <ImageBackground
        source={images.bg_category}
        style={styles.background}
      >
        <TouchableOpacity
          onPress={saveLocal}
          style={styles.btnDone}>
          <Text style={typography.regular.md}>Done</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['rgba(0, 0, 0,0)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <View style={styles.heardingView}>
            <Text style={styles.heading}>Wellcome to Nexle Entrance Test</Text>
            <Text style={typography.regular.md}> Please select categories what you would like to see on your feed. You can set this later on Filter.</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <FlatList
        style={styles.listCategorys}
        numColumns={3}
        contentContainerStyle={styles.listCategorysContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        data={categoriesIdsList}
        renderItem={renderItem}
      />
      {status === Status.loading && <Loading />}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center'
  },
  background: {
    resizeMode: 'cover',
    top: 0,
    width: '100%',
    height: SCREEN_HEIGHT,
    position: 'absolute',
    overflow: 'hidden'
  },
  linearGradient: {
    height: SCREEN_HEIGHT * 0.4,
    width: '100%',
  },
  heardingView: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    marginBottom: 20
  },
  heading: {
    ...typography.heading.md,
    marginBottom: 20,
  },
  listCategorys: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    marginTop: SCREEN_HEIGHT * 0.4,
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
    ...typography.regular.sm,
    minHeight: 62,
    paddingVertical: 24,
    alignSelf: 'center',
    color: 'rgba(255,255,255, 0.8)'
  },
  btnDone: {
    top: 30,
    right: 0,
    position: 'absolute',
    padding: 16,
    zIndex: 1
  }
});
