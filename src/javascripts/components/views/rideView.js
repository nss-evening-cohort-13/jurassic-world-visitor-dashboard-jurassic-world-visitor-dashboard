import firebase from 'firebase/app';
import 'firebase/auth';
import form from '../forms/rideForm';

const rideView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html('<button id="new-ride-btn" type="submit" class="btn btn-info add-ride"><i class="fas fa-plus-circle"></i>Add a Ride</button>');
    $('#new-ride-btn').on('click', () => {
      form.rideForm();
      $('.add-ride').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display rides only</h1>');
  }
};

export default { rideView };
