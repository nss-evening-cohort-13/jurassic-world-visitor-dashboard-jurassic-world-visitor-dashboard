import firebase from 'firebase/app';
import 'firebase/auth';
import dinoForm from '../forms/addDinoForm';

const dinoView = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('#app').html(`<div id="addDinoDiv">
      <div id="dinoSuccessMsg"></div>
      <div id="dinoErrorMsg"></div>
      <button type="button" class="btn btn-outline-dark add-btn" id="addDinoBtn">Add a Dino</button>
      </div>`);
    $('#addDinoBtn').on('click', () => {
      dinoForm.addDinoForm();
      $('#addDinoBtn').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display dinos only</h1>');
  }
};

export default { dinoView };
