import staffData from '../../helpers/data/staffData';

const addStaffForm = () => {
  $('#app').append(`<form>
  <div class="form-group">
    <label for="staffName">Name</label>
    <input type="text" class="form-control" id="staffName">
  </div>
  <div class="form-group">
    <label for="staffImage">Image Link</label>
    <input type="url" class="form-control" id="staffImage">
  </div>
  <button type="submit" class="btn btn-outline-dark" id="submitStaff">Submit</button>
</form>`);

  $('#submitStaff').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#staffName').val() || false,
      imageUrl: $('#staffImage').val() || false
    };

    staffData.addStaff(data);
  });
};

export default { addStaffForm };
