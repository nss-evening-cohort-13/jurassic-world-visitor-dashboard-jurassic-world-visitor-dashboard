import vendorData from '../../helpers/data/vendorData';

const vendorForm = () => {
  $('#app').append(`<form id="addVendorForm">
   <h2>Add A Vendor to The Park!</h2>
  <div id="success-message"></div>
  <form>
    <div id="error-message"></div>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Example: Lisa">
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input type="url" class="form-control" id="role" placeholder="Enter Image URL">
    </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" class="form-control" id="location" placeholder="Example: Nashville">
    </div>
    <button id="submit-vendor-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Vendor</button>
  </form>`);
  $('#submit-vendor-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      image: $('#image').val(),
      location: $('#location').val()
    };

    if (document.getElementById('addVendorForm').checkValidity()) {
      $('#error-message').html('');

      vendorData.addVendor(data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">The vendor has been added!</div>');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 2000);

      $('#name').val('');
      $('#image').val('');
      $('#location').val('');
    } else {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

export default { vendorForm };
