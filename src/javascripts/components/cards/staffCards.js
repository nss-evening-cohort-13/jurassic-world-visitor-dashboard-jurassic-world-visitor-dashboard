import staffData from '../../helpers/data/staffData';

const authedStaffCardMaker = (staffObject) => {
  const domString = `<div class="card card-body staff-cards" id="${staffObject.staffId}">
                      <div class="staff-card-body">
                        <div class="staff-img-container">
                          <img src="${staffObject.image}" class="card-img-top staff-img" alt="${staffObject.name}">
                        </div>
                        <div class="staff-info-div">
                            <h3 class="card-text card-header staff-name">${staffObject.name}</h3>
                            <button type="button" class="btn btn-light card-btns edit-staff" id="${staffObject.staffId}"><i class="fas fa-pen"></i></button>
                            <button type="button" class="btn btn-light card-btns assign-staff" id="${staffObject.staffId}"><i class="fas fa-calendar-alt"></i></button>
                            <button type="button" class="btn btn-light card-btns delete-staff" id="${staffObject.staffId}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                      </div>
                    </div>`;

  $('body').on('click', '.delete-staff', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    staffData.deleteStaff(firebaseKey);
  });
  return domString;
};

const unauthedStaffMaker = (staffObject) => {
  const domString = `<div class="card card-body" style="width: 18rem;" id="${staffObject.staffId}">
    <img src="${staffObject.image}" id="${staffObject.firebaseKey}" class="card-img-top card-img" alt="${staffObject.name}">
    <div>
      <h3 class="card-header">${staffObject.name}</h3>
    </div>
  </div>`;
  return domString;
};

const staffCardBuilder = () => {
  $('#cards').html('');
  staffData
    .getStaff()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          $('#cards').append(authedStaffCardMaker(item));
        } else {
          $('#cards').append('<h2>NO STAFF! HIRE SOMEBODY ALREADY!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { staffCardBuilder, authedStaffCardMaker, unauthedStaffMaker };
