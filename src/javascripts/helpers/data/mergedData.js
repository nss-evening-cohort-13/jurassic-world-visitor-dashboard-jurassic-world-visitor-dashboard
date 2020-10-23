import staffData from './staffData';
import dinoData from './dinoData';
// import rideData from './rideData';
// import vendorData from './vendorData';

const getDataForDinosView = () => new Promise((resolve, reject) => {
  dinoData.getDino().then((dinoResponse) => {
    staffData.getStaff().then((staffResponse) => {
      const dinoStuff = [];
      dinoResponse.forEach((dino) => {
        const staffObject = staffResponse.find((staff) => staff.uid === dino.staffUid);
        const staffUse = {
          staffName: staffObject.name,
          staffEmail: staffObject.email
        };
        dinoStuff.push({ ...dino, ...staffUse });
        resolve(dinoStuff);
      });
    });
  }).catch((error) => reject(error));
});

const getSingleStaffViewForDinos = (staffUid) => new Promise((resolve, reject) => {
  staffData.getSingleStaff(staffUid)
    .then((staffResponse) => {
      dinoData.getStaffDinos(staffResponse.uid)
        .then((dinoResponse) => {
          const finalObject = { staff: staffResponse, dinos: dinoResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

// const getDataForRidesView = () => new Promise((resolve, reject) => {
//   rideData.getAllRides().then((rideResponse) => {
//     staffData.getStaff().then((staffResponse) => {
//       const rideStuff = [];
//       rideResponse.forEach((ride) => {
//         const staffObject = staffResponse.find((staff) => staff.uid === ride.staffId);
//         const staffUse = {
//           staffName: staffObject.name,
//           staffEmail: staffObject.email
//         };
//         rideStuff.push({ ...dino, ...staffUse });
//         resolve(rideStuff);
//       });
//     });
//   }).catch((error) => reject(error));
// });

// const getSingleStaffViewForRides = (staffUid) => new Promise((resolve, reject) => {
//   staffData.getSingleStaff(staffUid)
//     .then((staffResponse) => {
//       dinoData.getStaffDinos(staffResponse.uid)
//         .then((dinoResponse) => {
//           const finalObject = { staff: staffResponse, dinos: dinoResponse };
//           resolve(finalObject);
//         });
//     }).catch((error) => reject(error));
// });

// const getDataForDinosView = () => new Promise((resolve, reject) => {
//   dinoData.getDino().then((dinoResponse) => {
//     staffData.getStaff().then((staffResponse) => {
//       const dinoStuff = [];
//       dinoResponse.forEach((dino) => {
//         const staffObject = staffResponse.find((staff) => staff.uid === dino.staffId);
//         const staffUse = {
//           staffName: staffObject.name,
//           staffEmail: staffObject.email
//         };
//         dinoStuff.push({ ...dino, ...staffUse });
//         resolve(dinoStuff);
//       });
//     });
//   }).catch((error) => reject(error));
// });

// const getSingleStaffView = (staffUid) => new Promise((resolve, reject) => {
//   staffData.getSingleStaff(staffUid)
//     .then((staffResponse) => {
//       dinoData.getStaffDinos(staffResponse.uid)
//         .then((dinoResponse) => {
//           const finalObject = { staff: staffResponse, dinos: dinoResponse };
//           resolve(finalObject);
//         });
//     }).catch((error) => reject(error));
// });

export default { getDataForDinosView, getSingleStaffViewForDinos };
