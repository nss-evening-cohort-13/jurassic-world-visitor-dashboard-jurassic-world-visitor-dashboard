import vendorData from '../../helpers/data/vendorData';

const vendorForm = () => {
  $('#vendor-form').html(
    ` <h2>Add A Vendor to The Park!</h2>
      <div id="success-message"></div>
      <form>
        <div id="error-message"></div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Example: Lisa">
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <input type="text" class="form-control" id="role" placeholder="Example: Breakfast">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" placeholder="Example: Nashville">
        </div>
        <button id="add-vendor-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Vendor</button>
      </form>`
  );
};

$('#vendor-link').on('click', (e) => {
  e.preventDefault();
  console.warn('clicked', e);

  const data = {
    location: $('#location').val() || false,
    name: $('#name').val() || false,
    role: $('#role').val() || false,
  };

  if (Object.values(data).includes(false)) {
    $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
  } else {
    $('#error-message').html('');
    console.warn(data);
    vendorData.addVendor(data)
      .then(() => {
        $('#success-message').html('<div class="alert alert-success" role="alert">Your Vendor Was Added!</div>');

        setTimeout(() => {
          $('#success-message').html('');
        }, 3000);
      }).catch((error) => console.warn(error));

    $('#location').val('');
    $('#name').val('');
    $('#role').val('');
  }
});

export default { vendorForm };
