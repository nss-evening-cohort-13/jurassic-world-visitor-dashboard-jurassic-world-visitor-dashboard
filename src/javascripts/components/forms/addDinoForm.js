import dinoData from '../../helpers/data/dinoData';

const addDinoForm = () => {
  $('#app').append(`
  <form id="addDinoForm">
  <h1>Add a Staff Member</h1>
  <div id="dinoErrorMsg"></div>
  <div id="dinoSuccessMsg"></div>
  <div class="form-group">
    <label for="dinoName">Name</label>
    <input type="text" class="form-control" id="dinoName" required>
  </div>
  <div class="form-group">
    <label for="dinoImage">Image Link</label>
    <input type="url" class="form-control" id="dinoImage" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitDino">Submit</button>
</form>`);

  $('#submitDino').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#dinoName').val(),
      imageUrl: $('#dinoImage').val()
    };
    if (document.querySelector('#addDinoForm').checkValidity()) {
      $('#dinoErrorMsg').html('');
      dinoData.addDino(data)
        .then(() => {
          $('#addDinoForm').remove();
          $('#dinoSuccessMsg').html('<div class="alert alert-success" role="alert">The dino has been added!</div>');
          $('#addDinoBtn').removeAttr('disabled');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#dinoSuccessMsg').html('');
      }, 3000);
    } else {
      $('#dinoErrorMsg').html('<div class="alert alert-danger" role="alert">Please fill out all fields correctly.</div>');
    }
  });
};

export default { addDinoForm };
