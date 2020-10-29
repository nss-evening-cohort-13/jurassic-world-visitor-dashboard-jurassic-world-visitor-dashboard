import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import dinoData from '../../helpers/data/dinoData';
import staffData from '../../helpers/data/staffData';
import dinoCards from '../cards/dinoCards';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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
  <div class="form-group">
              <label for="staff">Staff</label>
              <select class="form-control" id="staff" required>
                  <option value="">Select Staff</option>
               </select>
                 </div>
  <div class="form-group">
                <label for="staff2">Staff 2</label>
               <select class="form-control" id="staff2" required>
                   <option value="">Select Staff 2</option>
                </select>
                  </div>
  <button type="submit" class="btn btn-outline-dark buttons" id="submitDino">Submit</button>
</form>`);
  staffData.getStaff().then((response) => {
    response.forEach((item) => {
      // This retrieves a staff name only if it is not assigned with a dinoId
      if (!(item.dinoId)) {
        $('select').append(`<option value="${item.staffId}">${item.name}</option>`);
      }
    });
  });
  $('#submitDino').on('click', (e) => {
    e.preventDefault();
    const data = {
      name: $('#dinoName').val(),
      imageUrl: $('#dinoImage').val(),
      staffId: $('#staff').val(),
      staffId2: $('#staff2').val(),
    };

    if (document.querySelector('#addDinoForm').checkValidity() && data.staffId !== data.staffId2) {
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
            // This patch, adds a dinoId to the staff object
            axios.patch(`${baseUrl}/staff/${data.staffId}.json`, { dinoId: response.data.name });
            axios.patch(`${baseUrl}/staff/${data.staffId2}.json`, { dinoId: response.data.name })
              .then(() => dinoCards.dinoCardBuilder());
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
