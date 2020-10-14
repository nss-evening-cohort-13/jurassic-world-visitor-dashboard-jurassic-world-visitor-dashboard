import firebase from 'firebase/app';
import 'firebase/auth';
import staffForm from '../forms/addStaffForm';

const staffView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`
    <div id="addStaffDiv">
    <button type="button" class="btn btn-outline-dark add-btn" id="addStaffBtn">Add a Staff Member</button>
    </div>`);

    $('#addStaffBtn').on('click', () => {
      staffForm.addStaffForm();
      $('#addStaffBtn').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display staff only</h1>');
  }
};

export default { staffView };
