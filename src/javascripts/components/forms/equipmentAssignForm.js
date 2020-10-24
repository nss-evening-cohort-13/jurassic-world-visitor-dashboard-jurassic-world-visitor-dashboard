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

  const listOfEquipment = [];
  const listOfStaffEquip = [];
  equipmentData.getEquipment().then((equipmentResponse) => {
    equipmentResponse.forEach((equipItem) => {
      listOfEquipment.push(equipItem.name);
    });
    staffData.getStaff().then((staffResponse) => {
      staffResponse.forEach((staffItem) => {
        if (staffItem.equipmentName) {
          listOfStaffEquip.push(staffItem.equipmentName);
        }
      });
    });
    listOfEquipment.forEach((equipInArray) => {
      listOfStaffEquip.forEach((staffInArray) => {
        if (equipInArray !== staffInArray) {
          const listOfCombinedEquipment = [];
          listOfCombinedEquipment.push(staffInArray);
          console.warn(listOfCombinedEquipment);
          $('#select').append(
            `<option value="${equipInArray}">${equipInArray}</option>`
          );
        }
      });
    });
  });

  // equipmentData.getEquipment().then((equipmentResponse) => {
  //   staffData.getStaff().then((staffResponse) => {
  //     staffResponse.forEach((staffItem) => {
  //       equipmentResponse.forEach((equipmentItem) => {
  //         if (staffItem.equipmentName !== equipmentItem.name) {
  //           const listOfItems = [];
  //           listOfItems.push(equipmentItem.name);
  //           console.warn(listOfItems);
  //           $('#select').append(
  //             `<option value="${equipmentItem.name}">${equipmentItem.name}</option>`
  //           );
  //         }
  //       });
  //     });
  //   });
  // });

  $('#assign-equip-btn').on('click', (e) => {
    e.preventDefault();

    const information = {
      equipmentName: $('#tool').val() || false,
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
          $('#cards').html('');
          staffView.staffView();
        })
        .catch((error) => console.warn(error));
    }
  });
};

export default { assignToolForm };
