import ridesData from '../../helpers/data/ridesData';

const rideCardBuilder = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top card-image" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
    <button type="button" class="btn btn-light delete-rides" id="${rideObject.staffId}">Delete Ride</button>
  </div>
</div>`;

  $('body').on('click', '.delete-rides', (e) => {
    console.warn('click', e);
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    ridesData.deleteRides(firebaseKey);
  });

  return domString;
};

export default { rideCardBuilder };
