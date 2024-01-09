import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import styles from './ImageSliderStyles'; 
import { useGetData } from './store/zustand';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const ImageSlider = () => {

  const [loading, setLoading] = useState(true);
  const getData = useGetData();
  const { favorites, addFavorite } = useGetData();
  useEffect(() => {
    getData.execute();
  }, []);
console.log(getData);
const handleAddFavorite = (payload: any) => {
  getData.addFavorite(payload);
  const jsonUser = storage.getString('favorites')
  console.log(jsonUser,'added');
};

  const { width } = useWindowDimensions();
  const imageSize = width * 0.8;
  const spacing = 10;

  const renderImageItem = ({ item, index }:any) => {
     const marginLeft = index === 0 ? (width - imageSize) / 2 : spacing / 2;
     const marginRight = index === getData.length - 1 ? (width - imageSize) / 2 : spacing / 2;

    return (
    <TouchableOpacity onPress={() => handleAddFavorite(item)}>
        <View style={[styles.imageContainer,{marginLeft,marginRight }]}>
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
    );
  };



  const snapToOffsets = getData?.data?.map((item:any,index: number) => index * (imageSize + spacing));

  return (
    <View style={styles.container}>
      <FlatList
        data={getData.data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(index : number) => index.toString()}
        renderItem={renderImageItem}
        contentContainerStyle={styles.contentContainer}
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
      />
    </View>
  );
};

export default ImageSlider;
