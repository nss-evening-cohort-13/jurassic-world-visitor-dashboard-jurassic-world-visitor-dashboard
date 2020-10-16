import dinoData from '../../helpers/data/dinoData';
import dinoCards from '../cards/dinoCards';
import dinoView from '../views/dinoView';

const editDinoForm = (dinoObject) => {
  dinoView.dinoView();
  $('#addDinoBtn').attr('disabled', true);
  $('#app').append(`
  <form id="editDinoForm">
  <h1>Edit Dino</h1>
  <div class="form-group">
    <label for="dinoName">Name</label>
    <input type="text" class="form-control" id="dinoName" value="${dinoObject.name}" placeholder="Example: T-Rex" required>
  </div>
  <div class="form-group">
    <label for="dinoImage">Image Link</label>
    <input type="url" class="form-control" id="dinoImage" value="${dinoObject.imageUrl}" placeholder="Example: trex.jpg" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitEditDino">Update</button>
</form>`);

  $('#submitEditDino').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#dinoName').val(),
      imageUrl: $('#dinoImage').val(),
    };
    if (document.querySelector('#editDinoForm').checkValidity()) {
      $('#dinoErrorMsg').html('');
      dinoData
        .editDino(dinoObject.dinoId, data)
        .then((response) => {
          if (response.status === 200) {
            $('#editDinoForm').remove();
            $('#dinoSuccessMsg').append(
              '<div class="alert alert-success" role="alert">The dino has been updated!</div>'
            );
            $('#addDinoBtn').removeAttr('disabled');
            dinoCards.dinoCardBuilder();
          }
        })
        .catch((error) => console.warn(error));

      setTimeout(() => {
        $('#dinoSuccessMsg').html('');
      }, 3000);
    } else {
      $('#dinoErrorMsg').html(
        '<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>'
      );
    }
  });
};

export default { editDinoForm };
