import staffView from '../components/views/staffView';
import rideView from '../components/views/rideView';
import dinoView from '../components/views/dinoView';

const viewHelper = (id) => {
  $('#app').html('');

  switch (id) {
    case 'staff-link':
      return staffView.staffView();
    case 'rides-link':
      return rideView.rideView();
    case 'dino-link':
      return dinoView.dinoView();
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
