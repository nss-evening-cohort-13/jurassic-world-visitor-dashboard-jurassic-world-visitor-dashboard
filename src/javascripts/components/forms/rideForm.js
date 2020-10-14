import rideData from '../../helpers/data/ridesData';

const rideForm = () => {
  $('#app').append(
    `
            <form id="addRideForm">
            <h2>Add a Ride</h2>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="rideName" placeholder="Example: Roller Coaster" required>
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="url" class="form-control" id="rideImage" placeholder="Example: https://www.images.com/rollercoaster.jpg" required>
              </div>
              <button id="add-ride-btn" type="submit" class="btn btn-outline-dark">Submit</button>
            </form>`
  );

  $('#add-ride-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#rideName').val(),
      image: $('#rideImage').val()
    };

    if (document.getElementById('addRideForm').checkValidity()) {
      $('#rideErrorMessage').html('');
      rideData.addRide(data)
        .then(() => {
          $('#addRideForm').remove();
          $('#rideSuccessMessage').html('<div class="alert alert-success" role="alert">Your Ride Was Added!</div>');
          $('#new-ride-btn').removeAttr('disabled');
          $('#cards').append(rideCards.rideCardBuilder(rideObj));
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#rideSuccessMessage').html('');
      }, 3000);
      $('#rideName').val('');
      $('#rideImage').val('');
    } else {
      $('#rideErrorMessage').html('<div class="alert alert-danger" role="alert">Please complete all fields correctly.</div>');
    }
  });
};

export default { rideForm };
