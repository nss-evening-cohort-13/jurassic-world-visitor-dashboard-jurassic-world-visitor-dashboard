import firebase from 'firebase/app';
import 'firebase/auth';
import navbar from '../../components/navbar/navbar';
import auth from '../../components/auth/auth';
import viewHelpers from '../viewHelpers';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navbar.navbar();
      viewHelpers.viewListeners('dino-link');
      viewHelpers.toastView();
    } else {
      auth.loginButton();
      viewHelpers.viewListeners('dino-link');
    }
  });
};

export default { checkLoginStatus };
