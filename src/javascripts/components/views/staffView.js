import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../../helpers/apiKeys.json';
import 'firebase/auth';
import staffForm from '../forms/addStaffForm';
import staffCards from '../cards/staffCards';
import staffData from '../../helpers/data/staffData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const staffView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`
    <div id="addStaffDiv">
    <div id="staffErrorMsg"></div>
    <div id="staffSuccessMsg"></div>
    <button type="button" class="btn btn-outline-dark add-btn" id="addStaffBtn">Add a Staff Member</button>
    </div>`);

    $('#addStaffBtn').on('click', () => {
      staffForm.addStaffForm();
      $('#addStaffBtn').attr('disabled', true);
    });
    staffData.getStaff().then((response) => {
      if (response.length) {
        response.forEach((staff) => {
          const equipId = staff.equipmentId;
          $('#cards').append(staffCards.authedStaffCardMaker(staff));
          if (staff.equipmentName) {
            $(`.assign-tools-staff#${staff.staffId}`).remove();
            $(`.assigned-equipment#${staff.staffId}`).html(`
            <div id="display-assigned-tools-area">
                <i class="fas fa-toolbox"></i> Assigned ${staff.equipmentName}
            </div>
            <div id="unassign-tool">
            <button type="button" class="btn btn-light card-btns unassign-stafftools-btn" id="${staff.staffId}"><i class="fas fa-minus-square"></i></button>
            </div>
            `);
            $(`.unassign-stafftools-btn#${staff.staffId}`).on('click', (e) => {
              e.stopImmediatePropagation();
              const firebaseKey = e.currentTarget.id;
              // firebaseKey is the staff UID!!!
              $(`.assigned-equipment#${firebaseKey}`).html('No Assigned Equipment!');
              axios.delete(`${baseUrl}/equipment/${equipId}/staffId.json`);
              axios.delete(`${baseUrl}/staff/${firebaseKey}/equipmentName.json`);
              axios.delete(`${baseUrl}/staff/${firebaseKey}/equipmentId.json`);
              $(`.staff-info-div#${firebaseKey}`).append(`<button type="button" class="btn btn-light card-btns assign-tools-staff" id="${firebaseKey}">
              <i class="fas fa-tools"></i></button>`);
            });
          }
        });
      }
    });
  } else {
    staffData.getStaff().then((response) => {
      if (response.length) {
        response.forEach((staff) => {
          $('#cards').append(staffCards.unauthedStaffMaker(staff));
        });
      }
    });
  }
};

export default { staffView };
