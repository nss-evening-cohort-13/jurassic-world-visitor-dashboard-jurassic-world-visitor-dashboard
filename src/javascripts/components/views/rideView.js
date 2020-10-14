import firebase from 'firebase/app';
import 'firebase/auth';
import form from '../forms/rideForm';

const rideView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`<div id="addRideDiv">
    <div id="rideSuccessMessage"></div>
    <div id="rideErrorMessage"></div>
    <button id="new-ride-btn" type="submit" class="btn btn-outline-dark add-btn">Add a Ride</button>
    </div>`);
    $('#new-ride-btn').on('click', () => {
      form.rideForm();
      $('#new-ride-btn').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display rides only</h1>');
  }
};

export default { rideView };
