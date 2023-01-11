import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
  Pressable,
  ImageBackground,
} from 'react-native'
import { colors } from './Colors'
import { auth } from './Fire';
import { handleLogin } from './functions/LoginFunc';
import { handleRegister } from './functions/Register';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './functions/useTogglePasswordVisibility';
import img from '../assets/loginBack.jpg'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const navigator = useNavigation()

  const HandleLogin = () => {
    handleLogin(auth, email, password, navigator)
  }

  const handleSignUp = () => {
    handleRegister(auth, email, password, ToastAndroid)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground style={styles.img} source={img} resizeMode="cover">
        <View style={[styles.inputContainer]}>
          <View style={styles.inputContainerPsw}>
            <MaterialCommunityIcons name="email-outline" size={24} color={colors.blue} />
            <TextInput
              placeholder="Enter email..."
              style={styles.inputField}
              value={email}
              onChangeText={text => setEmail(text)}
              multiline
            />
          </View>

          <View style={styles.inputContainerPsw}>
            <MaterialCommunityIcons name="key-outline" size={24} color={colors.blue} />
            <TextInput
              style={styles.inputField}
              placeholder="Enter password..."
              secureTextEntry={passwordVisibility}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size={22} color={colors.blue} />
            </Pressable>
          </View>

        </View>

        <View style={[styles.buttonContainer]}>

          <TouchableOpacity style={[styles.btn]} onPress={HandleLogin}>
            <Text style={[styles.btnText]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={handleSignUp}>
            <Text style={[styles.btnOutlineText]}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: "100%"
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  btn: {
    width: "100%",
    backgroundColor: "#0782F9",
    borderRadius: 30,
    padding: 15,
    alignItems: "center"
  },
  btnOutline: {
    backgroundColor: colors.white,
    borderColor: "#0782F9",
    marginTop: 5,
    borderWidth: 2,
  },
  btnText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 20,
  },
  btnOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 20,
  },
  inputContainerPsw: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    margin: 10,
    paddingHorizontal: 10
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '85%',
  },
  loginPageBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  registerPageBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  account: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: '600'
  }

})
