const vendorMaker = (vendorObject) => {
  const domString = `<div class="card board" style="width: 18rem;" id="${vendorObject.vendorId}">
    <img src="${vendorObject.imageUrl}" id="${vendorObject.firebaseKey}" class="card-img-top see-dinns" alt="${vendorObject.name}">
    <div class="card-body">
      <h5 class="card-title">${vendorObject.name}</h5>
    </div>
  </div>`;

  return domString;
};

export default { vendorMaker };
