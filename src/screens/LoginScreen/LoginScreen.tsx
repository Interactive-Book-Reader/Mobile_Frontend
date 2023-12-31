import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import { RootStackScreenProps } from "../../navigators/RootNavigator";
import loginPublisher from "../../api/auth/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormessage, setErrormessage] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (username === "") {
      setErrormessage("Username is required");
      return;
    }
    if (password === "") {
      setErrormessage("Password is required");
      return;
    }
    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);

    try {
      const responseData = await loginPublisher(loginData);

      if (responseData.message === "Login successful.") {
        console.log(responseData);
        try {
          await AsyncStorage.setItem("token", responseData.token);
        } catch (e) {
          console.log(e);
        }
        navigation.navigate({ name: "TabsStack", key: "123" });
      } else {
        // console.log(responseData);
        setErrormessage(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            paddingTop: Spacing * 5,
            paddingLeft: Spacing * 2,
            paddingRight: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: Spacing,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 40,
                color: Colors.primary,
              }}
            >
              Login here
            </Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: FontSize.large,
                maxWidth: "90%",
                textAlign: "center",
              }}
            >
              Welcome back you've been missed!
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing,
            }}
          >
            <AppTextInput
              placeholder="Username *"
              onChangeText={(newText) => setUsername(newText)}
              value={username}
            />
            <AppTextInput
              placeholder="Password *"
              secureTextEntry={showPassword ? false : true}
              onChangeText={(newText) => setPassword(newText)}
              value={password}
            />
            <TouchableOpacity
              onPress={handleTogglePasswordVisibility}
              style={{ marginLeft: Spacing }}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="black"
                style={{ flexDirection: "row", alignItems: "center" }}
              />
              <Text style={{ color: Colors.darkText, marginLeft: 5 }}>
                {showPassword ? "Hide Password" : "Show Password"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: "flex-end",
              }}
            >
              Forgot your password ?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
              marginHorizontal: Spacing * 5,
              borderRadius: 130,
              shadowColor: "black",
              shadowOffset: {
                width: 200,
                height: 10,
              },
              shadowOpacity: 10,
              shadowRadius: 10,
              elevation: 14, // Android
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: FontSize.medium,
                color: "red",
                alignSelf: "center",
              }}
            >
              {errormessage}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              padding: Spacing,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing / 2,
              marginHorizontal: Spacing * 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.text,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Create new account
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.primary,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Or Continue With
            </Text>

            <View
              style={{
                marginTop: Spacing,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons name="logo-google" size={Spacing * 2} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-apple"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
