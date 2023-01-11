import AsyncStorage from '@react-native-async-storage/async-storage';
export const handleRegister = (auth, email, password, ToastAndroid) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(async (usercredentials) => {
      await AsyncStorage.setItem('userEmail', usercredentials.user.email);
      ToastAndroid.showWithGravity('User successfully created!!!', ToastAndroid.SHORT, ToastAndroid.TOP)
    })
    .catch((err) => ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.TOP))
}