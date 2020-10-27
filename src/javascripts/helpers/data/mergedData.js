import staffData from './staffData';
import dinoData from './dinoData';
import rideData from './rideData';
import vendorData from './vendorData';

const getDataForDinosView = () => new Promise((resolve, reject) => {
  dinoData.getDino().then((dinoResponse) => {
    staffData.getStaff().then((staffResponse) => {
      if (staffResponse === null) {
        const staffNull = [];
        dinoResponse.forEach((dino) => {
          const staffNullName = {
            staffName: 'Unassigned',
          };
          staffNull.push({ ...dino, ...staffNullName });
          console.warn(staffNull);
          resolve(staffNull);
        });
      } else {
        const dinoStuff = [];
        dinoResponse.forEach((dino) => {
          const staffObject = staffResponse.find((staff) => staff.staffId === dino.staffId);
          const staffUse = {
            staffName: staffObject.name,
          };
          dinoStuff.push({ ...dino, ...staffUse });
          resolve(dinoStuff);
        });
      }
    });
  }).catch((error) => reject(error));
});

const getSingleStaffViewForDinos = (staffUid) => new Promise((resolve, reject) => {
  staffData.getSingleStaff(staffUid)
    .then((staffResponse) => {
      console.warn(staffUid);
      dinoData.getStaffDinos(staffResponse.staffId)
        .then((dinoResponse) => {
          const finalObject = { staff: staffResponse, dinos: dinoResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

const getDataForRidesView = () => new Promise((resolve, reject) => {
  rideData.getAllRides().then((rideResponse) => {
    staffData.getStaff().then((staffResponse) => {
      const rideStuff = [];
      rideResponse.forEach((ride) => {
        const staffObject = staffResponse.find((staff) => staff.staffId === ride.staffId);
        const staffUse = {
          staffName: staffObject.name,
        };
        rideStuff.push({ ...ride, ...staffUse });
        resolve(rideStuff);
      });
    });
  }).catch((error) => reject(error));
});

const getSingleStaffViewForRides = (staffUid) => new Promise((resolve, reject) => {
  staffData.getSingleStaff(staffUid)
    .then((staffResponse) => {
      rideData.getStaffRides(staffResponse.staffId)
        .then((rideResponse) => {
          const finalObject = { staff: staffResponse, rides: rideResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

const getDataForVendorsView = () => new Promise((resolve, reject) => {
  vendorData.getVendors().then((vendorResponse) => {
    staffData.getStaff().then((staffResponse) => {
      const vendorStuff = [];
      vendorResponse.forEach((vendor) => {
        const staffObject = staffResponse.find((staff) => staff.staffId === vendor.staffId);
        const staffUse = {
          staffName: staffObject.name,
        };
        vendorStuff.push({ ...vendor, ...staffUse });
        resolve(vendorStuff);
      });
    });
  }).catch((error) => reject(error));
});

const getSingleStaffViewforVendors = (staffUid) => new Promise((resolve, reject) => {
  staffData.getSingleStaff(staffUid)
    .then((staffResponse) => {
      vendorData.getStaffVendor(staffResponse.staffId)
        .then((vendorResponse) => {
          const finalObject = { staff: staffResponse, vendor: vendorResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

export default {
  getDataForDinosView, getSingleStaffViewForDinos, getDataForRidesView, getSingleStaffViewForRides, getDataForVendorsView, getSingleStaffViewforVendors
};
