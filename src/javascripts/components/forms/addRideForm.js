import rideData from '../../helpers/data/rideData';
// import cards from '../cards/rideCards';

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
      image: $('#rideImage').val(),
    };

    if (document.getElementById('addRideForm').checkValidity()) {
      $('#rideErrorMessage').html('');

      rideData
        .addRide(data)
        .then((response) => {
          if (response.statusText === 'OK') {
            $('#addRideForm').remove();
            $('#rideSuccessMessage').html(
              '<div class="alert alert-success" role="alert">Your Ride Was Added!</div>'
            );
            $('#new-ride-btn').removeAttr('disabled');
            $('#cards').append(`<div class="card card-body" style="width: 18rem;" id="${response.data.name}">
            <img src="${data.image}" id="${data.firebaseKey}" class="card-img-top card-img" alt="${data.name}">
            <div>
              <h3 class="card-header">${data.name}</h3>
              <button type="button" class="btn btn-light update-ride card-btns" id="${response.data.name}"><i class="fas fa-pen"></i></button>
              <button type="button" class="btn btn-light delete-rides card-btns" id="${response.data.name}"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>`);
          }
        })
        .catch((error) => console.warn(error));

      setTimeout(() => {
        $('#rideSuccessMessage').html('');
      }, 3000);
    } else {
      $('#rideErrorMessage').html(
        '<div class="alert alert-danger" role="alert">Please complete all fields correctly.</div>'
      );
    }
  });
};

export default { rideForm };
