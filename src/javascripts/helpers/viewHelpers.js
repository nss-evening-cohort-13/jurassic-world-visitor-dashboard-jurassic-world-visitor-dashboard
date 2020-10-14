import staffView from '../components/views/staffView';
import vendorView from '../components/views/vendorView';

const viewHelper = (id) => {
  $('#app').html('');

  switch (id) {
    case 'staff-link':
      return staffView.staffView();
    case 'vendor-link':
      return vendorView.vendorView();
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
