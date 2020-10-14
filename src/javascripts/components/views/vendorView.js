import firebase from 'firebase/app';
import 'firebase/auth';
import vendorForm from '../forms/vendorForm';

const vendorView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`
      <div id="add-vendor-div">
      <button type="button" class="btn btn-outline-dark" id="add-vendor-btn">Add a Vendor</button>
      </div>`);

    $('#add-vendor-btn').on('click', () => {
      vendorForm.vendorForm();
      $('#add-vendor-btn').attr('disabled', true);
    });
  } else {
    $('#app').html('<h1>Display Vendor only</h1>');
  }
};

export default { vendorView };
