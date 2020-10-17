import firebase from 'firebase/app';
import 'firebase/auth';
import form from '../forms/addRideForm';
import rideCards from '../cards/rideCards';

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
  }
  rideCards.rideCardBuilder();
};

export default { rideView };
