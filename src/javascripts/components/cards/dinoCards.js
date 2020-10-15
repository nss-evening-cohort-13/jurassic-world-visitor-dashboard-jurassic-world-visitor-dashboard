import dinoData from '../../helpers/data/dinoData';

const dinoCardView = (dinoObject) => {
  const domString = `<div class="card" id="${dinoObject.dinoId}" style="width: 18rem;">
    <img src="${dinoObject.imageUrl}" class="card-img-top" alt="${dinoObject.name}">
    <div class="card-body">
      <p class="card-text">${dinoObject.name}</p>
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
  window.location.reload();
};

export default { dinoCardBuilder };
