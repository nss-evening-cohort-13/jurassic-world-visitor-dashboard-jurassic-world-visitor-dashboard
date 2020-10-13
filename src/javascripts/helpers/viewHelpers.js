import staffView from '../components/views/staffView';

const viewHelper = (id) => {
  $('#app').html('');

  switch (id) {
    case 'add-staff-link':
      return staffView.staffView();
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
