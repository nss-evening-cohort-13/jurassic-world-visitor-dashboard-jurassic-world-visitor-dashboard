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
      imageUrl: $('#equipmentImage').val(),
    };
    if (document.querySelector('#addEquipmentForm').checkValidity()) {
      $('#equipmentErrorMsg').html('');
      equipmentData
        .addEquipment(data)
        .then((response) => {
          if (response.status === 200) {
            $('#addEquipmentForm').remove();
            $('#equipmentSuccessMsg').append(
              '<div class="alert alert-success" role="alert">The equipment has been added!</div>'
            );
            $('#addEquipmentBtn').removeAttr('disabled');
            $('#cards').append(`<div class="card card-body" id="${response.data.name}">
            <div>
              <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
              <div>
                <h3 class="card-text card-header">${data.name}</h3>
              </div>
              <div class="button-body">
              <button type="button" id="${response.data.name}" class="btn btn-info update-equipment card-btns"><i class="fas fa-pen"></i></button>
              <button type="button" id="${response.data.name}" class="btn btn-info delete-equipment card-btns"><i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>`);
          }
        })
        .catch((error) => console.warn(error));

      setTimeout(() => {
        $('#equipmentSuccessMsg').html('');
      }, 3000);
    } else {
      $('#equipmentErrorMsg').html(
        '<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>'
      );
    }
  });
};

export default { addEquipmentForm };
