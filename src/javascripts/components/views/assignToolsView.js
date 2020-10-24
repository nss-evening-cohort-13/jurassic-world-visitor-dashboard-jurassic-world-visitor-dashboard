import staffData from '../../helpers/data/staffData';
import form from '../forms/equipmentAssignForm';

const assignTools = (dinoFirebaseKey) => {
  staffData.getSingleStaff(dinoFirebaseKey).then((response) => {
    form.assignToolForm(response);
  });
};

export default { assignTools };
