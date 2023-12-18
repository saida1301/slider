import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import styles from './ImageSliderStyles'; 

const ImageSlider = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=5');
        const images = response.data.map((item: { download_url: any; }) => item.download_url);
        setImageList(images);
      } catch (error: any) {
        console.error('Error fetching images:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, []);

  const { width } = useWindowDimensions();
  const imageSize = width * 0.8;
  const spacing = 10;

  const renderImageItem = ({ item, index }:any) => {
    const marginLeft = index === 0 ? (width - imageSize) / 2 : spacing / 2;
    const marginRight = index === imageList.length - 1 ? (width - imageSize) / 2 : spacing / 2;

    return (
      <View style={[styles.imageContainer, { marginLeft, marginRight }]}>
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const snapToOffsets = imageList.map((_, index) => index * (imageSize + spacing));

  return (
    <View style={styles.container}>
      <FlatList
        data={imageList}
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
