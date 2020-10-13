import form from '../forms/rideForm';

const rideView = () => {
  $('#app').html('<button id="new-ride-btn" type="submit" class="btn btn-info add-ride"><i class="fas fa-plus-circle"></i>Add a Ride</button>');
  $('body').on('click', '.add-ride', (e) => {
    e.preventDefault();

    form.rideForm();
    $('.add-ride').addClass('disabled');
  });
};

export default { rideView };
