import dinoData from '../../helpers/data/dinoData';
import form from '../forms/editDinoForm';

const updateDinoView = (dinoFirebaseKey) => {
  $('#app').html('<div id="update-dino-form"></div>');
  dinoData.getSingleDino(dinoFirebaseKey).then((response) => {
    form.editDinoForm(response);
  });
};

export default { updateDinoView };
