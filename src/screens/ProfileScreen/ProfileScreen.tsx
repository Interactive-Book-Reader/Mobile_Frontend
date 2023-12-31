import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import getPublisher from "../../api/profile/get_user";
import updateReader from "../../api/profile/update_user";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [biodata, setBiodata] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isAccountNoEditing, setIsAccountNoEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);
  const [id, setID] = useState("");

  interface DecodedToken {
    _id: string;
  }

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setID(decodedToken._id);

      const responseData = await getPublisher(decodedToken._id);
      setName(responseData.user[0].name);
      setemail(responseData.user[0].email);
      setUsername(responseData.user[0].username);
      setBiodata(responseData.user[0].bio_data);
      setPhoneNumber(responseData.user[0].phonenumber);
      setImageLink(responseData.user[0].image_link);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleSavePress = async () => {
    setIsNameEditing(false);
    setIsEmailEditing(false);
    setIsPasswordEditing(false);
    setIsAccountNoEditing(false);
    setIsAddressEditing(false);
    setIsPhoneNumberEditing(false);
    interface UserData {
      id: string;
      name: string;
      email: string;
      username: string;
      bio_data?: string;
      phonenumber?: string;
      password?: string;
    }

    const updateData: UserData = {
      id: id,
      name: name,
      email: email,
      username: username,
    };

    if (password !== "") {
      updateData.password = password;
    }
    if (biodata !== "") {
      updateData.bio_data = biodata;
    }
    if (phoneNumber !== "") {
      updateData.phonenumber = phoneNumber;
    }
    try {
      const response = await updateReader(updateData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    console.log("logout");
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: statusBarHeight,
      }}>
      <View style={styles.upperPart}>
        <Text style={styles.text}>Profile</Text>

        <TouchableOpacity style={styles.logOutButton}>
          <View>
            <Button title="Log out" onPress={handleLogout} />
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.lowerPart}>
          {imageLink ==="" ? (
            <Image
              resizeMode="cover"
              style={styles.circle}
              source={require("../../assets/images/photo-1483134529005-4c93495107d5.jpg")}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.circle}
              source={{
                uri: imageLink,
              }}
            />
          )}

          <View
            style={{ padding: 10, margin: 5, height: 40, marginBottom: 15 }}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.editabletext}>
            <Text style={styles.label}>Name : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isNameEditing ? "black" : "gray" },
              ]}
              value={name}
              editable={isNameEditing}
              onChangeText={(newText) => setName(newText)}
            />
            <TouchableOpacity onPress={() => setIsNameEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.editabletext}>
            <Text style={styles.label}>Email : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isEmailEditing ? "black" : "gray" },
              ]}
              value={email}
              editable={isEmailEditing}
              onChangeText={(newText) => setemail(newText)}
            />
            <TouchableOpacity onPress={() => setIsEmailEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Password : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isPasswordEditing ? "black" : "gray" },
              ]}
              value={password}
              secureTextEntry={isPasswordEditing ? false : true}
              editable={isPasswordEditing}
              onChangeText={(newText) => setPassword(newText)}
            />
            <TouchableOpacity onPress={() => setIsPasswordEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Username : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isAccountNoEditing ? "black" : "gray" },
              ]}
              value={username}
              editable={isAccountNoEditing}
              onChangeText={(newText) => setUsername(newText)}
            />
            <TouchableOpacity onPress={() => setIsAccountNoEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Bio data : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isAddressEditing ? "black" : "gray" },
              ]}
              value={biodata}
              editable={isAddressEditing}
              onChangeText={(newText) => setBiodata(newText)}
            />
            <TouchableOpacity onPress={() => setIsAddressEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Phone Number : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isPhoneNumberEditing ? "black" : "gray" },
              ]}
              value={phoneNumber}
              editable={isPhoneNumberEditing}
              onChangeText={(newText) => setPhoneNumber(newText)}
            />
            <TouchableOpacity onPress={() => setIsPhoneNumberEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.saveButton}>
            <TouchableOpacity style={styles.button} onPress={handleSavePress}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  upperPart: {
    backgroundColor: "#000030",
    width: "100%",
    height: 70,
    alignContent: "center",
    justifyContent: "center",
  },
  lowerPart: {
    width: "100%",
    height: "75%",
    top: 20,
    left: 5,
    right: 10,
    paddingHorizontal: 10,
  },

  logOutButton: {
    width: 85,
    height: 60,
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 5,
  },

  saveButton: {
    width: "100%",
    padding: 20,
    borderRadius: 5,
    color: "white",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    width: 100,
    margin: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  circle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    shadowColor: "black",
  },

  text: {
    alignSelf: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },

  nameText: {
    alignSelf: "center",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    position: "absolute",
    padding: 5,
    paddingBottom: 10,
  },

  label: {
    alignSelf: "center",
    width: 110,
    fontWeight: "bold",
  },

  textInput: {
    width: "95%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 8,
    color: "black",
    borderRadius: 5,
  },

  editabletext: {
    flexDirection: "row",
    width: "60%",
    marginBottom: 4,
  },
});
