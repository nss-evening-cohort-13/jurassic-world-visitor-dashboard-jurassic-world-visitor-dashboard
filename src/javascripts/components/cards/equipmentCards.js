import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentData from '../../helpers/data/equipmentData';

const authedEquipmentCardView = (equipmentObject) => {
  const domString = `<div>
        <img src="${equipmentObject.imageUrl}" class="card-img-top" alt="${equipmentObject.name}">
        <div>
          <h3 class="card-text card-header">${equipmentObject.name}</h3>
        </div>
        <button type="button" id="${equipmentObject.equipmentId}" class="btn btn-info update-equipment card-btns"><i class="fas fa-pen"></i></button>
        <button type="button" id="${equipmentObject.equipmentId}" class="btn btn-info delete-equipment card-btns"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>`;
  $('body').on('click', 'button.delete-equipment', (e) => {
    $(`.card#${e.currentTarget.id}`).remove();
    equipmentData.deleteEquipment(e.currentTarget.id);
  });
  return domString;
};

const unauthedEquipmentCardView = (equipmentObject) => {
  const domString = `
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
            $('#cards').append(`<div class="card card-body" id="${item.equipmentId}"> ${authedEquipmentCardView(item)}`);
          } else {
            $('#cards').append(`<div class="card card-body" id="${item.equipmentId}"> ${unauthedEquipmentCardView(item)}`);
          }
        } else {
          $('#cards').append('<h2> NO DINOS!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { equipmentCardBuilder };
