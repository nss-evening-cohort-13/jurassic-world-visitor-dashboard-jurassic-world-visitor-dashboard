import equipmentData from '../../helpers/data/equipmentData';
import staffData from '../../helpers/data/staffData';
import staffView from '../views/staffView';

const assignToolForm = (staffObj) => {
  staffView.staffView();
  $('#addStaffBtn').hide();
  $('#app').append(`
    <div id="user-message"></div>
      <form>
        <div class="form-group>
        <label for="user">Assign Equpment to ${staffObj.name} below:</label>
        <select class="form-control" id="tool">
        <option value="">Select</option>
        </select>
    </div>
      <button id="assign-equip-btn" type="submit" class="btn btn-info">Submit</button>
  </form>`);

  equipmentData.getEquipment().then((response) => {
    response.forEach((resp) => {
      $('select').append(
        `<option value="${resp.equipmentId}">${resp.name}</option>`
      );
    });
  });
  $('#assign-equip-btn').on('click', (e) => {
    e.preventDefault();

    const information = {
      equipmentId: $('#tool').val() || false,
    };

    if (Object.values(information).includes(false)) {
      $('#user-message').html(
        '<div class="alert alert-danger" role="alert">Please select equipment!</div>'
      );
    } else {
      $('#user-message').html('');
      staffData
        .updateStaff(staffObj.staffId, information)
        .then(() => {
          $('#user-message').html(
            '<div class="alert alert-success" role="alert">Equipment Assigned!</div>'
          );
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#user-message').html('');
      }, 2000);
      $('#name').val('');
      $('#picture').val('');
      $('#site').val('');
      $('#board').val('');
    }
  });
};

export default { assignToolForm };
