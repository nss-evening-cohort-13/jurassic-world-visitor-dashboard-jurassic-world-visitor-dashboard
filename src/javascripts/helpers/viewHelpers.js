import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';
import equipmentView from '../components/views/equipmentView';
import editVendorForm from '../components/forms/editVendorForm';
import updateDinoView from '../components/views/updateDinoView';
import updateRideView from '../components/views/updateRideView';

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
    case 'edit-vendor':
      return editVendorForm.editVendorForm(arg);
    case 'update-dino-link':
      return updateDinoView.updateDinoView(arg);
    case 'update-ride-link':
      return updateRideView.updateRideView(arg);
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
  $('body').on('click', 'button.edit-vendor', (e) => {
    viewHelper('edit-vendor', e.currentTarget.id);
    e.stopImmediatePropagation();
  });
  $('body').on('click', '.update-dino', (e) => {
    const dinoFirebaseKey = e.currentTarget.id;
    viewHelper('update-dino-link', dinoFirebaseKey);
  });
  $('body').on('click', '.update-ride', (e) => {
    const rideFirebaseKey = e.currentTarget.id;
    viewHelper('update-ride-link', rideFirebaseKey);
    e.stopImmediatePropagation();
  });
};

export default { viewListeners };
