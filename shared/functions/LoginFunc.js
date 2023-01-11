import { navigateToHomeScreenAfterLogin } from './NavigatingToHomeFunc'
export const handleLogin = (auth, email, password, navigator) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      navigateToHomeScreenAfterLogin(auth, navigator)
    })
    .catch((err) => alert(err.message))
}