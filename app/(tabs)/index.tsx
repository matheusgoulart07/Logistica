import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/imagemLogistica2.jpg');

export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2F33",
    alignItems: "center",
  },
  imageContainer: {
    flex:1,
    padding: 20,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});