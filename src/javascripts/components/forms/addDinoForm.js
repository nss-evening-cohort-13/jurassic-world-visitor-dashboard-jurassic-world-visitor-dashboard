import dinoData from '../../helpers/data/dinoData';
import dinoCards from '../cards/dinoCards';

const addDinoForm = () => {
  $('#app').append(`
  <form id="addDinoForm">
  <h1>Add a Dino</h1>
  <div class="form-group">
    <label for="dinoName">Name</label>
    <input type="text" class="form-control" id="dinoName" placeholder="Example: T-Rex" required>
  </div>
  <div class="form-group">
    <label for="dinoImage">Image Link</label>
    <input type="url" class="form-control" id="dinoImage" placeholder="Example: trex.jpg" required/>
  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitDino">Submit</button>
</form>`);

  $('#submitDino').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#dinoName').val(),
      imageUrl: $('#dinoImage').val(),
    };

    if (document.querySelector('#addDinoForm').checkValidity()) {
      $('#dinoErrorMsg').html('');
      dinoData
        .addDino(data)
        .then((response) => {
          if (response.status === 200) {
            $('#addDinoForm').remove();
            $('#dinoSuccessMsg').append(
              '<div class="alert alert-success" role="alert">The dino has been added!</div>'
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

export default { addDinoForm };
