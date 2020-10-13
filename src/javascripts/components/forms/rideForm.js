import rideData from '../../helpers/data/ridesData';

const rideForm = () => {
  $('#app').html(
    `<h2>Add A Ride</h2>
            <div id="success-message"></div>
            <form>
              <div id="error-message"></div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Example: Roller Coaster">
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="text" class="form-control" id="image" placeholder="Example: http://www.google.jpg">
              </div>
              <button id="add-ride-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Ride</button>
            </form>`
  );

  $('#add-ride-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val() || false,
      image: $('#image').val() || false,
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');
      rideData.addRide(data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Ride Was Added!</div>');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
      $('#name').val('');
      $('#image').val('');
    }
  });
};

export default { rideForm };
