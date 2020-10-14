import staffData from '../../helpers/data/staffData';

const staffCardMaker = (staffObject) => {
  const domString = `<div class="card m-2" style="width: 18rem;" id="${staffObject.firebaseKey}">
    <div class="card-body">
      <h5 class="card-title">${staffObject.name}</h5>
      <img src="${staffObject.image}" alt="${staffObject.name}">
    </div>
  </div>`;
  return domString;
};

const staffCardBuilder = (e) => {
  $('#cards').html('');
  staffData
    .getStaff()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          $('#cards').append(staffCardMaker(item));
        } else {
          $('#cards').append('<h2>NO STAFF! HIRE SOMEBODY ALREADY!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
  e.stopImmediatePropogation();
};

export default { staffCardBuilder };
