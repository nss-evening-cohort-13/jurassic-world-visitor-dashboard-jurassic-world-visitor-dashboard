import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';
import equipmentView from '../components/views/equipmentView';
import updateEquipmentView from '../components/views/updateEquipmentView';
import editVendorForm from '../components/forms/editVendorForm';
import editStaffForm from '../components/forms/editStaffForm';
import updateDinoView from '../components/views/updateDinoView';
import updateRideView from '../components/views/updateRideView';
import chaosView from '../components/views/chaosView';
import singleStaffView from '../components/views/singleStaffView';

const toastView = () => {
  $('body').on('click', 'p.nav-item', () => {
    chaosView.chaosView();
  });
};

const viewHelper = (id, arg) => {
  $('#app').html('');
  $('#cards').html('');
  $('#toast').html('');

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
    case 'edit-vendor':
      return editVendorForm.editVendorForm(arg);
    case 'edit-staff':
      return editStaffForm.editStaffForm(arg);
    case 'update-dino-link':
      return updateDinoView.updateDinoView(arg);
    case 'update-ride-link':
      return updateRideView.updateRideView(arg);
    case 'single-staff':
      return singleStaffView.singleStaffViewDinos(arg);
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
  $('body').on('click', 'button.edit-vendor', (e) => {
    viewHelper('edit-vendor', e.currentTarget.id);
    e.stopImmediatePropagation();
  });
  $('body').on('click', 'button.edit-staff', (e) => {
    viewHelper('edit-staff', e.currentTarget.id);
    e.stopImmediatePropagation();
  });
  $('body').on('click', '.update-dino', (e) => {
    const dinoFirebaseKey = e.currentTarget.id;
    viewHelper('update-dino-link', dinoFirebaseKey);
    e.stopImmediatePropagation();
  });
  $('body').on('click', '.update-ride', (e) => {
    const rideFirebaseKey = e.currentTarget.id;
    viewHelper('update-ride-link', rideFirebaseKey);
    e.stopImmediatePropagation();
  });
  $('body').on('click', 'button.assign-vendor', (e) => {
    console.warn('click');
    const staffId = e.currentTarget.id;
    viewHelper('single-staff', staffId);
  });
};

export default { viewListeners, toastView };
