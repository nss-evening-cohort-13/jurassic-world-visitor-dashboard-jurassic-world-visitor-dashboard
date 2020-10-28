import axios from 'axios';
import firebase from 'firebase/app';
// import apiKeys from '../../helpers/apiKeys.json';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import mergedData from '../../helpers/data/mergedData';
// import staffData from '../../helpers/data/staffData';

// const baseUrl = apiKeys.firebaseKeys.databaseURL;

const authedDinoCardView = (dinoObject) => {
  const domString = `<div class="card card-body" id="${dinoObject.dinoId}">
      <div>
        <img src="${dinoObject.imageUrl}" class="card-img-top" alt="${dinoObject.name}">
        <div>
          <h3 class="card-text card-header">${dinoObject.name}</h3>
        </div>
        <div>
          <h6 class="card-text card-header">Staff: ${dinoObject.staffName}</h6>
        </div>
        <button type="button" id="${dinoObject.dinoId}" class="btn btn-info update-dino card-btns"><i class="fas fa-pen"></i></button>
        <button type="button" data-staff="${dinoObject.staffId}" id="${dinoObject.dinoId}" class="btn btn-info delete-dino card-btns"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>`;
  $('body').on('click', 'button.delete-dino', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    const staffid = $(`.delete-dino#${firebaseKey}`).data('staff');
    axios.delete(`https://nutshell-part-two.firebaseio.com/staff/${staffid}/dinoId.json`);
    dinoData.deleteDino(firebaseKey);
    $(`.card#${firebaseKey}`).remove();
  });

  return domString;
};

const unauthedDinoCardView = (dinoObject) => {
  const domString = `<div class="card card-body" id="${dinoObject.dinoId}">
      <div>
        <img src="${dinoObject.imageUrl}" class="card-img-top" alt="${dinoObject.name}">
        <div>
          <h3 class="card-text card-header">${dinoObject.name}</h3>
        </div>
      </div>
    </div>`;
  return domString;
};

const dinoCardBuilder = () => {
  const user = firebase.auth().currentUser;
  $('#cards').html('');
  mergedData
    .getDataForDinosView()
    .then((response) => {
      console.warn(response);
      response.forEach((item) => {
        if (response.length) {
          if (user) {
            $('#cards').append(authedDinoCardView(item));
          } else {
            $('#cards').append(unauthedDinoCardView(item));
          }
        } else {
          $('#cards').append('<h2> NO DINOS!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { dinoCardBuilder };
