import equipmentData from '../../helpers/data/equipmentData';
import equipmentCards from '../cards/equipmentCards';
import equipmentView from '../views/equipmentView';

const editEquipmentForm = (equipmentObject) => {
  equipmentView.equipmentView();
  $('#addEquipmentBtn').attr('disabled', true);
  $('#app').append(`
  <form id="editEquipmentForm">
  <h1>Edit Equipment</h1>
  <div class="form-group">
    <label for="equipmentName">Name</label>
    <input type="text" class="form-control" id="equipmentName" value="${equipmentObject.name}" placeholder="Example: Hammer" required>
  </div>
  <div class="form-group">
    <label for="equipmentImage">Image Link</label>
    <input type="url" class="form-control" id="equipmentImage" value="${equipmentObject.imageUrl}" placeholder="Example: hammer.jpg" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEditEquipment">Update</button>
</form>`);

  $('#submitEditEquipment').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#equipmentName').val(),
      imageUrl: $('#equipmentImage').val(),
    };
    if (document.querySelector('#editEquipmentForm').checkValidity()) {
      $('#equipmentErrorMsg').html('');
      equipmentData
        .editEquipment(equipmentObject.equipmentId, data)
        .then((response) => {
          if (response.status === 200) {
            $('#editEquipmentForm').remove();
            $('#equipmentSuccessMsg').append(
              '<div class="alert alert-success" role="alert">The equipment has been updated!</div>'
            );
            $('#addEquipmentBtn').removeAttr('disabled');
            equipmentCards.equipmentCardBuilder();
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

export default { editEquipmentForm };
