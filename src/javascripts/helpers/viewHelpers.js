import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';
import equipmentView from '../components/views/equipmentView';
import editVendorForm from '../components/forms/editVendorForm';

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
  });
};

export default { viewListeners };
