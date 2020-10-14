import equipmentData from '../../helpers/data/equipmentData';

const addEquipmentForm = () => {
  $('#app').append(`
  <form id="addEquipmentForm">
  <h1>Add Equipment</h1>
  <div class="form-group">
    <label for="equipmentName">Name</label>
    <input type="text" class="form-control" id="equipmentName" placeholder="Example: Hammer" required>
  </div>
  <div class="form-group">
    <label for="equipmentImage">Image Link</label>
    <input type="url" class="form-control" id="equipmentImage" placeholder="Example: hammer.jpg" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEquipment">Submit</button>
</form>`);

  $('#submitEquipment').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#equipmentName').val(),
      imageUrl: $('#equipmentImage').val()
    };
    if (document.querySelector('#addEquipmentForm').checkValidity()) {
      $('#equipmentErrorMsg').html('');
      equipmentData.addEquipment(data)
        .then(() => {
          $('#addEquipmentForm').remove();
          $('#equipmentSuccessMsg').html('<div class="alert alert-success" role="alert">The equipment has been added!</div>');
          $('#addEquipmentBtn').removeAttr('disabled');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#equipmentSuccessMsg').html('');
      }, 3000);
    } else {
      $('#equipmentErrorMsg').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

export default { addEquipmentForm };
