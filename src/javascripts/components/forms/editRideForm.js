import rideData from '../../helpers/data/rideData';
import rideCards from '../cards/rideCards';
import rideView from '../views/rideView';

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
  <div class="button-body id="${rideObject.rideId}">
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEditRide">Update</button>
  </div>
</form>`);

  $('#submitEditRide').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#rideName').val(),
      image: $('#rideImage').val(),
    };
    if (document.querySelector('#editRideForm').checkValidity()) {
      $('#rideErrorMessage').html('');
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
