const rideCardBuilder = (rideObject) => {
  const domString = `<div class="card" id="${rideObject.rideId}" style="width: 18rem;">
  <img src="${rideObject.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${rideObject.name}</p>
  </div>
</div>`;

  return domString;
};

export default { rideCardBuilder };
