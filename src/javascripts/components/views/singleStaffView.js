import mergetdData from '../../helpers/data/mergedData';

const singleStaffViewDinos = (staffUid) => {
  mergetdData.getSingleStaffViewForDinos(staffUid)
    .then((response) => {
      const { staff, dinos } = response;
      $('#assignment').append(`<div id="single-view">
                          <h1>${staff.name}'s Dinos!</h1>
                        </div>`);
      if (dinos.length) {
        dinos.forEach((dino) => {
          $('#single-view').append(`<h3>${dino.name}</h3>`);
        });
      } else {
        $('#single-view').append('<h1>NO DINOS</h1>');
      }
    });
};

// const singleStaffViewRides = (staffUid) => {
//   mergetdData.getSingleStaffView(staffUid)
//     .then((response) => {
//       const { staff, rides } = response;
//       $('#app').append(`<div id="single-view">
//                           <h1>${staff.name}'s Rides!</h1>
//                           </div>`);
//       if (rides.length) {
//         rides.forEach((ride) => {
//           $('#single-view').append(`<h3>${ride.name}</h3>`);
//         });
//       } else {
//         $('#single-view').append('<h1>NO RIDES</h1>');
//       }
//     });
// };

// const singleStaffViewVendor = (staffUid) => {
//   mergetdData.getSingleStaffView(staffUid)
//     .then((response) => {
//       const { staff, vendors } = response;
//       $('#app').append(`<div id="single-view">
//                           <h1>${staff.name}'s Vendors!</h1>
//                           </div>`);
//       if (vendors.length) {
//         vendors.forEach((vendor) => {
//           $('#single-view').append(`<h3>${vendor.name}</h3>`);
//         });
//       } else {
//         $('#single-view').append('<h1>NO VENDORS</h1>');
//       }
//     });
// };

export default { singleStaffViewDinos };
