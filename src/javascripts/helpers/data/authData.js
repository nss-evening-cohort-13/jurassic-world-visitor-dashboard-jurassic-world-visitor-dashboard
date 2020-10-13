import firebase from 'firebase/app';
import 'firebase/auth';
import navbar from '../../components/navbar/navbar';
import auth from '../../components/auth/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navbar.navbar();
    } else {
      auth.loginButton();
    }
  });
};

export default { checkLoginStatus };
