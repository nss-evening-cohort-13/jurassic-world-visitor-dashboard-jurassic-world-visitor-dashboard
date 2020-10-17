import staffData from '../../helpers/data/staffData';
import staffView from '../views/staffView';

const submitUpdatedStaff = (staffId) => {
  $('#submit-staff-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      image: $('#image').val(),
    };

    if (document.getElementById('editStaffForm').checkValidity()) {
      $('#error-message').html('');

      staffData.updateStaff(staffId, data)
        .then((response) => {
          if (response.statusText === 'OK') {
            $('#cards').html('');
            staffView.staffView();
            $('#staffSuccessMsg').html('<div class="alert alert-success" role="alert">The staff has been updated!</div>');
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

const editStaffForm = (staffId) => {
  staffData.getSingleStaff(staffId)
    .then((response) => {
      staffView.staffView();
      $('#addStaffBtn').attr('disabled', true);
      $('#app').append(`
      <form id="editStaffForm">
        <h2>Edit a Staff Member</h2>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Example: Lisa" value="${response.name}" required>
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input type="url" class="form-control" id="image" placeholder="Enter Image URL" value="${response.image}" required>
        </div>
        <button id="submit-staff-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Staff</button>
      </form>`);
      submitUpdatedStaff(staffId);
    }).catch((error) => console.warn(error));
};

export default { editStaffForm };
