import equipmentData from '../../helpers/data/equipmentData';

const equipmentCardView = (equipmentObject) => {
  const domString = `<div class="card card-body" id="${equipmentObject.firebaseKey}">
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
  $('#cards').html('');
  equipmentData
    .getEquipment()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          $('#cards').append(equipmentCardView(item));
        } else {
          $('#cards').append('<h2> NO DINOS!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { equipmentCardBuilder };
