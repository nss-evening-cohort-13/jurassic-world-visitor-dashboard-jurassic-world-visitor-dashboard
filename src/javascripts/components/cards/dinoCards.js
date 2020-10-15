import dinoData from '../../helpers/data/dinoData';

const dinoCardView = (dinoObject) => {
  const domString = `<div class="card card-body" id="${dinoObject.firebaseKey}">
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
  $('#cards').html('');
  dinoData
    .getDino()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          $('#cards').append(dinoCardView(item));
        } else {
          $('#cards').append('<h2> NO DINOS!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { dinoCardBuilder };
