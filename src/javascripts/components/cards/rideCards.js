<<<<<<< HEAD
import ridesData from '../../helpers/data/ridesData';

const rideCardBuilder = (rideObject) => {
=======
import firebase from 'firebase/app';
import 'firebase/auth';
import rideData from '../../helpers/data/rideData';

const rideCardMaker = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
    <button type="button" class="btn btn-light update-ride" id="${rideObject.rideId}">Edit</button>
    <button type="button" class="btn btn-light" id="${rideObject.rideId}">Delete</button>
  </div>
</div>`;

  return domString;
};

const unauthRideCardMaker = (rideObject) => {
>>>>>>> e9eaa22e1f3d326c761d15b46dbadf7ea2401d1d
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}
    <button type="button" class="btn btn-light delete-rides" id="${rideObject.rideId}">Delete Ride</button>
    </h3>
  </div>
</div>`;

  $('body').on('click', '.delete-rides', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    ridesData.deleteRides(firebaseKey);
  });

  return domString;
};

const rideCardBuilder = () => {
  const user = firebase.auth().currentUser;
  $('#cards').html('');
  rideData
    .getAllRides()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          if (user) {
            $('#cards').append(rideCardMaker(item));
          } else {
            $('#cards').append(unauthRideCardMaker(item));
          }
        } else {
          $('#cards').append('<h2> NO RIDES!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { rideCardBuilder };
