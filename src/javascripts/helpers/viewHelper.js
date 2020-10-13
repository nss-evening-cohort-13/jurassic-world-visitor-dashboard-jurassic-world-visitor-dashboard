import rideView from '../components/views/rideView';

const viewHelper = (id) => {
  $('#app').html('');
  switch (id) {
    case 'rides-link':
      return rideView.rideView();
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });
};

export default { viewListener };
