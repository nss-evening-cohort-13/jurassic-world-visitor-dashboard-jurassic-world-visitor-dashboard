import vendorData from '../../helpers/data/vendorData';

const vendorForm = () => {
  $('#app').append(`
  <form id="addVendorForm">
    <h2>Add a Vendor</h2>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Example: Lisa" required>
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input type="url" class="form-control" id="image" placeholder="Enter Image URL" required>
    </div>
    <button id="submit-vendor-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Vendor</button>
  </form>`);
  $('#submit-vendor-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      imageUrl: $('#image').val(),
    };

    if (document.getElementById('addVendorForm').checkValidity()) {
      $('#error-message').html('');

      vendorData.addVendor(data)
        .then((response) => {
          if (response.statusText === 'OK') {
            $('#addVendorForm').remove();
            $('#success-message').html('<div class="alert alert-success" role="alert">The vendor has been added!</div>');
            $('#add-vendor-btn').removeAttr('disabled');
            $('#cards').append(`<div class="card card-body" style="width: 18rem;" id="${response.data.name}">
            <img src="${data.imageUrl}" id="${data.firebaseKey}" class="card-img-top card-img" alt="${data.name}">
            <div>
              <h3 class="card-header">${data.name}</h3>
              <button type="button" class="btn btn-light edit-vendor" id="${response.data.name}">Edit</button>
              <button type="button" class="btn btn-light delete-vendor" id="${response.data.name}">Delete</button>
            </div>
          </div>`);
          }
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 2000);

      $('#name').val('');
      $('#image').val('');
    } else {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

export default { vendorForm };
