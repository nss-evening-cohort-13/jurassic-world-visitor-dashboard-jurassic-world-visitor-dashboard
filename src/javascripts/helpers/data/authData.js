import firebase from 'firebase/app';
import 'firebase/auth';
import navbar from '../../components/navbar/navbar';
import auth from '../../components/auth/auth';
import viewHelper from '../viewHelper';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navbar.navbar();
      viewHelper.viewListener('ride-link');
    } else {
      auth.loginButton();
    }
  });
};

export default { checkLoginStatus };
