import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import {
  launchImageLibrary,
  launchCamera,
  Asset,
  ImagePickerResponse,
} from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
import TextRecognition from "react-native-text-recognition";

// type ImageType = {
//   assets: Asset[];
// };
// : React.FC<TabsStackScreenProps<"Pdf">>

const OCRViewer = ({ navigation }) => {
  const [image, setImage] = (useState < String) | (null > null); // Change ImageType to string
  const [text, setText] = (useState < string) | (null > null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // Note the corrected property name "cancelled"
      setImage(result.uri); // Update the state with the selected image URI
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (image) {
          const result = await TextRecognition.recognize(image);
          console.log(result);
          const concatenatedText = result.join(" "); // Convert array to a single string
          setText(concatenatedText);
        }
      } catch (error) {
        console.error("Error occurred during text recognition:", error);
        setText(null); // Clear the text in case of an error
      }
    })();
  }, [image]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View>
        <Text>Text Recognition</Text>
        {text ? <Text>{text}</Text> : null}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OCRViewer;
