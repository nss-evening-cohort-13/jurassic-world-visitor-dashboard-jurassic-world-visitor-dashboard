import firebase from 'firebase/app';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';

const authedDinoCardView = (dinoObject) => {
  const domString = `<div class="card card-body" id="${dinoObject.dinoId}">
      <div>
        <img src="${dinoObject.imageUrl}" class="card-img-top" alt="${dinoObject.name}">
        <div>
          <h3 class="card-text card-header">${dinoObject.name}</h3>
        </div>
        <button type="button" id="${dinoObject.dinoId}" class="btn btn-info update-dino"><i class="fas fa-pen"></i></button>
        <button type="button" id="${dinoObject.dinoId}" class="btn btn-info delete-dino"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>`;

  $('body').on('click', 'button.delete-dino', (e) => {
    $(`.card#${e.currentTarget.id}`).remove();
    dinoData.deleteDino(e.currentTarget.id);
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
  dinoData
    .getDino()
    .then((response) => {
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
