const rideCardBuilder = (rideObject) => {
  const domString = `<div class="card card-body" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div>
    <h3 class="card-header">${rideObject.name}</h3>
  </div>
</div>`;

  return domString;
};

export default { rideCardBuilder };
