import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ListRenderItem,
} from 'react-native';
import { images, strings, typography } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { CategoryModel, Status } from '../../models';
import { MainNavigationProp } from '../../routes/type';
import Loading from '../../components/common/Loading';
import { SCREEN_HEIGHT } from '../../styles';
import { Header } from '../../components/header';
import { useFocusEffect } from '@react-navigation/native';
import { getCategoryAction, resetCategoryAction, selectCategoryAction } from '../../redux/reducer/category.reducer';

const Category = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.msg);
  const categoryData: CategoryModel[] = useAppSelector(state => state.categoryReducer.categoryData);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getCategoryAction(),
      )
      return () => {
        dispatch(resetCategoryAction());
      };
    }, [dispatch]),
  );

  useEffect(() => {
    console.log("Data has changed");
  }, [categoryData]);

  const renderItem: ListRenderItem<CategoryModel> = useCallback(
    ({ item: category, index }) => {
      const selectCategory = () => {
        selectCategoryAction(category.id);
      };

      if (index % 5 != 0) {
        return (
          <TouchableOpacity
            style={styles.category}>
            <Text style={styles.categoryLabel}>{category.name}</Text>
          </TouchableOpacity>
        )
      }
      return (
        <TouchableOpacity style={styles.category}>
          <LinearGradient
            style={styles.categoryChoosen}
            colors={['#8A00FF', '#8A32A9']}>
            <Text numberOfLines={2} lineBreakMode='middle' style={styles.categoryLabel}>{category.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )
    },
    []
  );
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <ImageBackground
        source={images.bg_category}
        style={styles.background}
      >
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
        data={categoryData ? categoryData : []}
        renderItem={renderItem}
      // data={Array.from(Array(50).keys())}
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
  }
});
