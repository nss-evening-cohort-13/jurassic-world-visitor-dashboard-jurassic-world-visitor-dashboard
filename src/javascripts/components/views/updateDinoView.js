import dinoData from '../../helpers/data/dinoData';
import form from '../forms/editDinoForm';

const updateDinoView = (dinoFirebaseKey) => new Promise((resolve, reject) => {
  dinoData.getSingleDino(dinoFirebaseKey)
    .then((response) => {
      resolve(form.editDinoForm(response));
    }).catch((error) => reject(error));
});

export default { updateDinoView };
