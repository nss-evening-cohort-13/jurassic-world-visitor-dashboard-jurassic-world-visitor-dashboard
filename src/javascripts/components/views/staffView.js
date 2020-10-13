import staffForm from '../forms/addStaffForm';

const staffView = () => {
  $('#app').html(`
  <div id="addStaffDiv">
  <button type="button" class="btn btn-outline-dark" id="addStaffBtn">Add a Staff Member</button>
  </div>`);

  $('#addStaffBtn').on('click', () => {
    staffForm.addStaffForm();
    $('#addStaffBtn').attr('disabled', true);
  });
};

export default { staffView };
