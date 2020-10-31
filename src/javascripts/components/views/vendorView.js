import firebase from 'firebase/app';
import 'firebase/auth';
import vendorForm from '../forms/vendorForm';
import vendorCard from '../cards/vendorCards';
import vendorData from '../../helpers/data/vendorData';
import mergedData from '../../helpers/data/mergedData';

const vendorView = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    $('#app').html(`
      <div id="add-vendor-div">
      <div id="success-message"></div>
      <div id="error-message"></div>
      <button type="button" class="add-btn btn btn-outline-dark" id="add-vendor-btn">Add a Vendor</button>
      </div>`);

    $('#add-vendor-btn').on('click', () => {
      vendorForm.vendorForm();
      $('#add-vendor-btn').attr('disabled', true);
    });
    mergedData.getDataForVendorsView().then((response) => {
      if (response.length) {
        response.forEach((vendor) => {
          $('#cards').append(vendorCard.authedVendorMaker(vendor));
        });
      }
    });
  } else {
    vendorData.getVendors().then((response) => {
      if (response.length) {
        response.forEach((vendor) => {
          $('#cards').append(vendorCard.unauthedVendorMaker(vendor));
        });
      }
    });
  }
};

export default { vendorView };
