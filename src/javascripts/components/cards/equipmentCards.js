import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentData from '../../helpers/data/equipmentData';

const authedEquipmentCardView = (equipmentObject) => {
  const domString = `<div class="card card-body" id="${equipmentObject.equipmentId}">
      <div>
        <img src="${equipmentObject.imageUrl}" class="card-img-top" alt="${equipmentObject.name}">
        <div>
          <h3 class="card-text card-header">${equipmentObject.name}</h3>
        </div>
        <button type="button" id="${equipmentObject.equipmentId}" class="btn btn-info update-equipment">Edit</button>
      </div>
    </div>`;
  return domString;
};

const unauthedEquipmentCardView = (equipmentObject) => {
  const domString = `<div class="card card-body" id="${equipmentObject.equipmentId}">
      <div>
        <img src="${equipmentObject.imageUrl}" class="card-img-top" alt="${equipmentObject.name}">
        <div>
          <h3 class="card-text card-header">${equipmentObject.name}</h3>
        </div>
      </div>
    </div>`;
  return domString;
};

const equipmentCardBuilder = () => {
  const user = firebase.auth().currentUser;
  $('#cards').html('');
  equipmentData
    .getEquipment()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          if (user) {
            $('#cards').append(authedEquipmentCardView(item));
          } else {
            $('#cards').append(unauthedEquipmentCardView(item));
          }
        } else {
          $('#cards').append('<h2> NO DINOS!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { equipmentCardBuilder };
