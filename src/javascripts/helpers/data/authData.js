import firebase from 'firebase/app';
import 'firebase/auth';
import navbar from '../../components/navbar/navbar';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navbar.navbar();
    } else {
      console.warn('else statement');
    }
  });
};

export default { checkLoginStatus };
