import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentForm from '../forms/addEquipmentForm';

const equipmentView = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('#app').html(`<div id="addEquipmentDiv">
      <div id="equipmentSuccessMsg"></div>
      <div id="equipmentErrorMsg"></div>
      <button type="button" class="btn btn-outline-dark add-btn" id="addEquipmentBtn">Add Equipment</button>
      </div>`);
    $('#addEquipmentBtn').on('click', () => {
      equipmentForm.addEquipmentForm();
      $('#addEquipmentBtn').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display equipment only</h1>');
  }
};

export default { equipmentView };