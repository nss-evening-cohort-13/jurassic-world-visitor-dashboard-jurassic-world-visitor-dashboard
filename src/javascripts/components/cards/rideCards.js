import firebase from 'firebase/app';
import 'firebase/auth';
import rideData from '../../helpers/data/rideData';

const rideCardMaker = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
    <button type="button" class="btn btn-light update-ride card-btns" id="${rideObject.rideId}"><i class="fas fa-pen"></i></button>
    <button type="button" class="btn btn-light delete-rides card-btns" id="${rideObject.rideId}"><i class="fas fa-trash-alt"></i></button>
  </div>
</div>`;

  $('body').on('click', '.delete-rides', (e) => {
    console.warn('click', e);
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    rideData.deleteRides(firebaseKey);
  });

  return domString;
};

const unauthRideCardMaker = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}
    </h3>
  </div>
</div>`;

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
