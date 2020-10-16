const rideCardBuilder = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
    <button type="button" class="btn btn-warning" id="${rideObject.rideId}">Edit</button>
    <button type="button" class="btn btn-danger" id="${rideObject.rideId}">Delete</button>
  </div>
</div>`;

  return domString;
};

const unauthRideCardBuilder = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
  </div>
</div>`;

  return domString;
};

export default { rideCardBuilder, unauthRideCardBuilder };
