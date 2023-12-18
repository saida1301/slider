
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = width * 0.8;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: imageSize,
    height: 200,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default styles;
