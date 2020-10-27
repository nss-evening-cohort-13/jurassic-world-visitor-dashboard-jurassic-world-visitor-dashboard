import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentForm from '../forms/addEquipmentForm';
import equipmentCards from '../cards/equipmentCards';
import equipmentData from '../../helpers/data/equipmentData';

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
    equipmentData.getEquipment()
    // We are calling the getEquipment function and making the class of invisible persistent on page load.
      .then((response) => {
        response.forEach((item) => {
          if (item.chaos === true) {
            $(`.button-body#${item.equipmentId}`).addClass('invisible');
          }
        });
      });
  } else {
    equipmentCards.equipmentCardBuilder();
  }
};

export default { equipmentView };
