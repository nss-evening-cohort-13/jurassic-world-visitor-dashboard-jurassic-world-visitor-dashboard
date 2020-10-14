import staffData from '../../helpers/data/staffData';

const addStaffForm = () => {
  $('#app').append(`<form id="addStaffForm">
  <h1>Add a Staff Member</h1>
  <div class="form-group">
    <label for="staffName">Name</label>
    <input type="text" class="form-control" id="staffName" required>
  </div>
  <div class="form-group">
    <label for="staffImage">Image Link</label>
    <input type="url" class="form-control" id="staffImage" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark" id="submitStaff">Submit</button>
</form>`);

  $('#submitStaff').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#staffName').val(),
      imageUrl: $('#staffImage').val()
    };

    if (document.getElementById('addStaffForm').checkValidity()) {
      $('#staffErrorMsg').html('');

      staffData.addStaff(data)
        .then(() => {
          $('#addStaffForm').remove();
          $('#staffSuccessMsg').append('<div class="alert alert-success" role="alert">The staff member has been added!</div>');
          $('#addStaffBtn').removeAttr('disabled');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#staffSuccessMsg').html('');
      }, 2000);
    } else {
      $('#staffErrorMsg').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

export default { addStaffForm };
