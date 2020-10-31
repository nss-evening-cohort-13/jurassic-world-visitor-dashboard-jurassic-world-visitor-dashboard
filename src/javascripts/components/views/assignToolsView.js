import staffData from '../../helpers/data/staffData';
import form from '../forms/equipmentAssignForm';

const assignTools = (FirebaseKey) => {
  staffData.getSingleStaff(FirebaseKey).then((response) => {
    form.assignToolForm(response);
  });
};

export default { assignTools };
