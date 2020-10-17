import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentForm from '../forms/addEquipmentForm';
import equipmentCards from '../cards/equipmentCards';

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
    equipmentCards.equipmentCardBuilder();
  } else {
    equipmentCards.equipmentCardBuilder();
  }
};

export default { equipmentView };
