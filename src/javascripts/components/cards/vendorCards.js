import vendorData from '../../helpers/data/vendorData';

const authedVendorMaker = (vendorObject) => {
  const domString = `<div class="card card-body" style="width: 18rem;" id="${vendorObject.vendorId}">
    <img src="${vendorObject.imageUrl}" id="${vendorObject.firebaseKey}" class="card-img-top card-img" alt="${vendorObject.name}">
    <div>
      <h3 class="card-header">${vendorObject.name}</h3>
      <button type="button" class="btn btn-light edit-vendor card-btns" id="${vendorObject.vendorId}"><i class="fas fa-pen"></i></button>
      <button type="button" class="btn btn-light delete-vendor card-btns" id="${vendorObject.vendorId}"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>`;
  $('body').on('click', '.delete-vendor', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    vendorData.deleteVendor(firebaseKey);
  });
  return domString;
};

const unauthedVendorMaker = (vendorObject) => {
  const domString = `<div class="card card-body" style="width: 18rem;" id="${vendorObject.vendorId}">
    <img src="${vendorObject.imageUrl}" id="${vendorObject.firebaseKey}" class="card-img-top card-img" alt="${vendorObject.name}">
    <div>
      <h3 class="card-header">${vendorObject.name}</h3>
    </div>
  </div>`;
  return domString;
};

export default { authedVendorMaker, unauthedVendorMaker };
