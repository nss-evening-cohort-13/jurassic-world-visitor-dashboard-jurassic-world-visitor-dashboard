import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import rideData from '../../helpers/data/rideData';
import rideCards from '../cards/rideCards';
import rideView from '../views/rideView';
import staffData from '../../helpers/data/staffData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const editRideForm = (rideObject) => {
  rideView.rideView();
  $('#new-ride-btn').attr('disabled', true);
  $('#app').append(`
  <form id="editRideForm">
  <h1>Edit Ride</h1>
  <div class="form-group">
    <label for="rideName">Name</label>
    <input type="text" class="form-control" id="rideName" value="${rideObject.name}" required>
  </div>
  <div class="form-group">
    <label for="rideImage">Image Link</label>
    <input type="url" class="form-control" id="rideImage" value="${rideObject.image}" required/>
  </div>
  <div class="form-group">
  <label for="staff">Staff</label>
    <select class="form-control" id="staff">
      <option value="">Select Staff</option>
    </select>
</div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEditRide">Update</button>
</form>`);
  staffData.getStaff().then((response) => {
    response.forEach((item) => {
      if (!(item.rideId && rideObject.rideId !== item.rideId)) {
        $('select').append(
          `<option value="${item.staffId}" ${
            rideObject.staffId === item.staffId ? "selected ='selected'" : ''
          }>${item.name}</option>`
        );
      }
    });
  });
  $('#submitEditRide').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#rideName').val(),
      image: $('#rideImage').val(),
      staffId: $('#staff').val(),
    };
    if (document.querySelector('#editRideForm').checkValidity()) {
      $('#rideErrorMessage').html('');
      staffData.deleteValueFromStaff(rideObject.staffId, 'rideId');
      axios.patch(`${baseUrl}/staff/${data.staffId}.json`, { rideId: rideObject.rideId });
      rideData
        .editRide(rideObject.rideId, data)
        .then((response) => {
          if (response.status === 200) {
            $('#editRideForm').remove();
            $('#rideSuccessMessage').append(
              '<div class="alert alert-success" role="alert">The ride has been updated!</div>'
            );
            $('#new-ride-btn').removeAttr('disabled');
            rideCards.rideCardBuilder();
          }
        })
        .catch((error) => console.warn(error));

      setTimeout(() => {
        $('#rideSuccessMessage').html('');
      }, 3000);
    } else {
      $('#rideErrorMessage').html(
        '<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>'
      );
    }
  });
};

export default { editRideForm };
