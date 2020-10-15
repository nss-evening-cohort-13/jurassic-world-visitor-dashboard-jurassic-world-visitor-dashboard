import firebase from 'firebase/app';
import 'firebase/auth';
import form from '../forms/rideForm';
import rideData from '../../helpers/data/ridesData';
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
    rideData.getAllRides()
      .then((response) => {
        if (response.length) {
          response.forEach((rideObj) => {
            $('#cards').append(rideCards.rideCardBuilder(rideObj));
          });
        } else {
          $('#cards').html('<h2>You have not yet added a ride.</h2>');
        }
      });
  } else {
    rideData.getAllRides()
      .then((response) => {
        if (response.length) {
          response.forEach((rideObj) => {
            $('#cards').append(rideCards.rideCardBuilder(rideObj));
          });
        } else {
          $('#cards').html('<h2>You have not yet added a ride.</h2>');
        }
      });
  }
};

export default { rideView };
