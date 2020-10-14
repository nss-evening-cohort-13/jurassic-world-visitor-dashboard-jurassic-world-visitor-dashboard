import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';
import equipmentView from '../components/views/equipmentView';

const viewHelper = (id) => {
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
    default:
      return console.warn('nothing clicked');
  }
};

const viewListeners = () => {
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });
};

export default { viewListeners };
