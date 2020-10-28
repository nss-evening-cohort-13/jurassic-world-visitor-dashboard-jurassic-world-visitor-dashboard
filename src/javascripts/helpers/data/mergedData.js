import staffData from './staffData';
import dinoData from './dinoData';
import rideData from './rideData';
import vendorData from './vendorData';

const getDataForDinosView = () => new Promise((resolve, reject) => {
  dinoData.getDino().then((dinoResponse) => {
    staffData.getStaff().then((staffResponse) => {
      const dinoStuff = [];
      dinoResponse.forEach((dino) => {
        const staffObject = staffResponse.find((staff) => staff.staffId === dino.staffId);
        const staffUse = {
          staffName: staffObject.name,
        };
        dinoStuff.push({ ...dino, ...staffUse });
        resolve(dinoStuff);
      });
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

export default {
  getDataForDinosView, getDataForRidesView, getDataForVendorsView
};
