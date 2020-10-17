import staffData from '../../helpers/data/staffData';

const authedStaffCardMaker = (staffObject) => {
  const domString = `<div class="card card-body" id="${staffObject.firebaseKey}">
    <div>
      <img src="${staffObject.image}" class="card-img-top" alt="${staffObject.name}">
      <div>
        <h3 class="card-text card-header">${staffObject.name}</h3>
        <button type="button" class="btn btn-light edit-staff" id="${staffObject.staffId}">Edit</button>
      </div>
    </div>
  </div>`;
  return domString;
};

const unauthedStaffMaker = (staffObject) => {
  const domString = `<div class="card card-body" style="width: 18rem;" id="${staffObject.vendorId}">
    <img src="${staffObject.imageUrl}" id="${staffObject.firebaseKey}" class="card-img-top card-img" alt="${staffObject.name}">
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
        console.warn(item);
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
