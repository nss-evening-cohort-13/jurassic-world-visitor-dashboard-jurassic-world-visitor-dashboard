import firebase from 'firebase/app';
import 'firebase/auth';
import vendorForm from '../forms/vendorForm';

const vendorView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`
      <div id="add-vendor-div">
      <div id="success-message"></div>
      <div id="error-message"></div>
      <button type="button" class="add-btn btn-outline-dark" id="add-vendor-btn">Add a Vendor</button>
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
