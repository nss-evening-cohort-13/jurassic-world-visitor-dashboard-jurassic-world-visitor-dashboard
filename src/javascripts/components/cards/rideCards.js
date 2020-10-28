import Axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import rideData from '../../helpers/data/rideData';
import mergedData from '../../helpers/data/mergedData';
// import staffData from '../../helpers/data/staffData';

const rideCardMaker = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
    <div>
          <h6 class="card-text card-header">Staff: ${rideObject.staffName}</h6>
    </div>
    <div class="button-body" id="${rideObject.rideId}">
    <button type="button" class="btn btn-light update-ride card-btns" id="${rideObject.rideId}"><i class="fas fa-pen"></i></button>
    <button type="button" data-staff="${rideObject.staffId}" class="btn btn-light delete-rides card-btns" id="${rideObject.rideId}"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>
</div>`;

  $('body').on('click', 'button.delete-rides', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    const staffId = $(`.delete-rides#${firebaseKey}`).data('staff');
    Axios.delete(`https://nutshell-part-two.firebaseio.com/staff/${staffId}/rideId.json`);
    rideData.deleteRides(firebaseKey);
    $(`.card#${firebaseKey}`).remove();
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
  mergedData
    .getDataForRidesView()
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
