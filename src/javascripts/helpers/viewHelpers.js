import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';
import equipmentView from '../components/views/equipmentView';
import updateEquipmentView from '../components/views/updateEquipmentView';
import updateDinoView from '../components/views/updateDinoView';

const viewHelper = (id, arg) => {
  $('#app').html('');
  $('#cards').html('');

  switch (id) {
    case 'staff-link':
      return staffView.staffView();
    case 'vendor-link':
      return vendorView.vendorView();
    case 'rides-link':
      return rideView.rideView();
    case 'dino-link':
      return dinoView.dinoView();
    case 'equipment-link':
      return equipmentView.equipmentView();
    case 'update-equipment-link':
      return updateEquipmentView.updateEquipmentView(arg);
    case 'update-dino-link':
      return updateDinoView.updateDinoView(arg);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListeners = (view) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
    e.stopImmediatePropagation();
  });
  $('body').on('click', '.update-equipment', (e) => {
    const equipmentFirebaseKey = e.currentTarget.id;
    viewHelper('update-equipment-link', equipmentFirebaseKey);
    e.stopImmediatePropagation();
  });
  $('body').on('click', '.update-dino', (e) => {
    const dinoFirebaseKey = e.currentTarget.id;
    viewHelper('update-dino-link', dinoFirebaseKey);
    e.stopImmediatePropagation();
  });
};

export default { viewListeners };
