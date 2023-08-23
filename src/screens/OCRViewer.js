import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

const OCRViewer = ({navigation}) => {
  const { image, setImage } = useState(null);

  useEffect(() => {
    launchImageLibrary({}, setImage);
  }, []);

  useEffect(() => {
    if (image) {
      console.log(image);
    }
  });

  return (
    <SafeAreaView>
      <statusbar />
      <View>
        <Text>Text Recongnition</Text>
      </View>
    </SafeAreaView>
  );
};

exports default OCRViewer;