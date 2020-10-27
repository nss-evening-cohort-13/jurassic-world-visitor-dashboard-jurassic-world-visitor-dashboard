import firebase from 'firebase/app';
import 'firebase/auth';
import form from '../forms/addRideForm';
import rideCards from '../cards/rideCards';
import rideData from '../../helpers/data/rideData';

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
  rideData.getAllRides()
    .then((response) => {
      response.forEach((item) => {
        if (item.chaos === true) {
          $(`.button-body#${item.rideId}`).addClass('invisible');
          $(`.card#${item.rideId}`).addClass('card-fade');
        }
      });
    });
};
export default { rideView };
