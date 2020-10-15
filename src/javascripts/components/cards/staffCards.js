import staffData from '../../helpers/data/staffData';

const staffCardMaker = (staffObject) => {
  const domString = `<div class="card card-body" id="${staffObject.firebaseKey}">
    <div>
      <img src="${staffObject.image}" class="card-img-top" alt="${staffObject.name}">
      <div>
        <h3 class="card-text card-header">${staffObject.name}</h3>
      </div>
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
          $('#cards').append(staffCardMaker(item));
        } else {
          $('#cards').append('<h2>NO STAFF! HIRE SOMEBODY ALREADY!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};

export default { staffCardBuilder };
