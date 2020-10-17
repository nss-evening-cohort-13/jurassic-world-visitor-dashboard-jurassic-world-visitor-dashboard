import equipmentData from '../../helpers/data/equipmentData';
import form from '../forms/editEquipmentForm';

const updateEquipmentView = (equipmentFirebaseKey) => {
  equipmentData.getSingleEquipment(equipmentFirebaseKey).then((response) => {
    form.editEquipmentForm(response);
  });
};

export default { updateEquipmentView };
