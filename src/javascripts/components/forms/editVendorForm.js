import vendorData from '../../helpers/data/vendorData';
import vendorView from '../views/vendorView';
import staffData from '../../helpers/data/staffData';

const submitUpdatedVendor = (vendorId, oldResponse) => {
  $('#submit-vendor-btn').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#name').val(),
      imageUrl: $('#image').val(),
      staffId: $('#staff').val(),
      staffName: $('select option:selected').text() || false,
    };
    const newStaffId = $('#staff').val();
    if (document.getElementById('editVendorForm').checkValidity()) {
      $('#error-message').html('');
      staffData.deleteValueFromStaff(oldResponse.staffId, 'vendorId');
      staffData.updateStaff(newStaffId, { vendorId });

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
      $('#add-vendor-btn').attr('disabled', true);
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
        <div class="form-group">
         <label for="staff">Staff</label>
          <select class="form-control" id="staff">
          <option value="">Select Staff</option>
         </select>
        </div>
        <button id="submit-vendor-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Vendor</button>
      </form>`);
      submitUpdatedVendor(vendorId, response);
    });
  staffData.getStaff().then((response) => {
    response.forEach((item) => {
      if (!(item.vendorId)) {
        $('select').append(
          `<option value="${item.staffId}">${item.name}</option>`
        );
      }
    });
  }).catch((error) => console.warn(error));
};

export default { editVendorForm };
