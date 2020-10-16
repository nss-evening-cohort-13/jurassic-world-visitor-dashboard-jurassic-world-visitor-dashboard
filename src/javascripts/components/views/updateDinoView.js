import dinoData from '../../helpers/data/dinoData';
import form from '../forms/editDinoForm';

const updateDinoView = (dinoFirebaseKey) => {
  dinoData.getSingleDino(dinoFirebaseKey).then((response) => {
    form.editDinoForm(response);
  });
};

export default { updateDinoView };
