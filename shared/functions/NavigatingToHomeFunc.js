import AsyncStorage from '@react-native-async-storage/async-storage';
export const navigateToHomeScreenAfterLogin = async (auth, navigator) => {
  let userEmail = await AsyncStorage.getItem('userEmail');
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user || user && user === userEmail) {
      navigator.navigate('Home')
    }
  })
  return unsubscribe
}