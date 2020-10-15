import vendorData from '../../helpers/data/vendorData';
import vendorView from '../views/vendorView';

const submitUpdatedVendor = (vendorId) => {
  $('#submit-vendor-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      imageUrl: $('#image').val(),
    };

    if (document.getElementById('editVendorForm').checkValidity()) {
      $('#error-message').html('');

      vendorData.updateVendor(vendorId, data)
        .then((response) => {
          if (response.statusText === 'OK') {
            $('#cards').html('');
            vendorView.vendorView();
            $('#success-message').html('<div class="alert alert-success" role="alert">The vendor has been updated!</div>');
          }
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 2000);
    } else {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

const editVendorForm = (vendorId) => {
  vendorData.getSingleVendor(vendorId)
    .then((response) => {
      vendorView.vendorView();
      $('#app').append(`
      <form id="editVendorForm">
        <h2>Edit a Vendor</h2>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Example: Lisa" value="${response.name}" required>
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input type="url" class="form-control" id="image" placeholder="Enter Image URL" value="${response.imageUrl}" required>
        </div>
        <button id="submit-vendor-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Vendor</button>
      </form>`);
      submitUpdatedVendor(vendorId);
    }).catch((error) => console.warn(error));
};

export default { editVendorForm };
