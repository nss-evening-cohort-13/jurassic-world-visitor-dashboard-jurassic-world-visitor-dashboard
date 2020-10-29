import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import dinoData from '../../helpers/data/dinoData';
import dinoCards from '../cards/dinoCards';
import staffData from '../../helpers/data/staffData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const editDinoForm = (dinoObject) => {
  $('#app').html(`<div id="addDinoDiv">
      <div id="dinoSuccessMsg"></div>
      <div id="dinoErrorMsg"></div>
      <button type="button" class="btn btn-outline-dark add-btn" id="addDinoBtn">Add a Dino</button>
      </div>`);
  $('#addDinoBtn').attr('disabled', true);
  $('#app').append(`
  <form id="editDinoForm">
  <h1>Edit Dino</h1>
  <div class="form-group">
    <label for="dinoName">Name</label>
    <input type="text" class="form-control" id="dinoName" value="${dinoObject.name}" placeholder="Example: T-Rex" required>
  </div>
  <div class="form-group">
    <label for="dinoImage">Image Link</label>
    <input type="url" class="form-control" id="dinoImage" value="${dinoObject.imageUrl}" placeholder="Example: trex.jpg" required/>
  </div>
  <div class="form-group">
  <label for="staff">Staff</label>
    <select class="form-control" id="staff" required>
      <option value="">Select Staff</option>
    </select>
  </div>
  <div class="form-group">
    <label for="staff2">Staff 2</label>
      <select class="form-control" id="staff2" required>
      <option value="">Select Staff 2</option>
    </select>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEditDino">Update</button>
</form>`);
  staffData.getStaff().then((response) => {
    response.forEach((item) => {
      // This retrieves a staff name only if it is not assigned with a dinoId
      if (!(item.rideId || item.vendorId)) {
        $('#staff').append(
          `<option value="${item.staffId}" ${
            dinoObject.staffId === item.staffId ? "selected ='selected'" : ''
          }>${item.name}</option>`
        );
        $('#staff2').append(
          `<option value="${item.staffId}" ${
            dinoObject.staffId2 === item.staffId ? "selected ='selected'" : ''
          }>${item.name}</option>`
        );
      }
    });
  });

  $('#submitEditDino').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#dinoName').val(),
      imageUrl: $('#dinoImage').val(),
      staffId: $('#staff').val(),
      staffId2: $('#staff2').val()
    };
    if (document.querySelector('#editDinoForm').checkValidity() && data.staffId !== data.staffId2) {
      $('#dinoErrorMsg').html('');
      staffData.deleteValueFromStaff(dinoObject.staffId, 'dinoId');
      staffData.deleteValueFromStaff(dinoObject.staffId2, 'dinoId');
      dinoData
        .editDino(dinoObject.dinoId, data)
        .then((response) => {
          if (response.status === 200) {
            $('#editDinoForm').remove();
            $('#dinoSuccessMsg').append(
              '<div class="alert alert-success" role="alert">The dino has been updated!</div>'
            );
            $('#addDinoBtn').removeAttr('disabled');
            dinoCards.dinoCardBuilder();
            // This updates the staff object with the dinoId
            axios.patch(`${baseUrl}/staff/${data.staffId}.json`, { dinoId: dinoObject.dinoId });
            axios.patch(`${baseUrl}/staff/${data.staffId2}.json`, { dinoId: dinoObject.dinoId });
          }
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#dinoSuccessMsg').html('');
      }, 3000);
    } else {
      $('#dinoErrorMsg').html(
        '<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>'
      );
    }
  });
};

export default { editDinoForm };
