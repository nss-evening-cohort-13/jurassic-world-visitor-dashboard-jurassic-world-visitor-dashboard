import rideData from '../../helpers/data/ridesData';

const rideForm = () => {
  $('#app').append(
    `
            <div id="success-message"></div>
            <form id="addRideForm">
            <h2>Add A Ride</h2>
              <div id="error-message"></div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="rideName" placeholder="Example: Roller Coaster">
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="url" class="form-control" id="rideImage" placeholder="Example: http://www.google.jpg">
              </div>
              <button id="add-ride-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i>Submit</button>
            </form>`
  );

  $('#add-ride-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      image: $('#image').val()
    };

    if (document.getElementById('addRideForm').checkValidity()) {
      $('#error-message').html('');
      rideData.addRide(data)
        .then(() => {
          $('#addRideForm').remove();
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Ride Was Added!</div>');
          $('.add-ride').attr('disabled', false);
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
      $('#rideName').val('');
      $('#rideImage').val('');
    } else {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields correctly.</div>');
    }
  });
};

export default { rideForm };
