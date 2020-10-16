const vendorMaker = (vendorObject) => {
  const domString = `<div class="card card-body" style="width: 18rem;" id="${vendorObject.vendorId}">
    <img src="${vendorObject.imageUrl}" id="${vendorObject.firebaseKey}" class="card-img-top card-img" alt="${vendorObject.name}">
    <div>
      <h3 class="card-header">${vendorObject.name}</h3>
    </div>
  </div>`;
  return domString;
};

export default { vendorMaker };
