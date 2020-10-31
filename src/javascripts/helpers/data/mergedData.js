import staffData from './staffData';
import dinoData from './dinoData';
import rideData from './rideData';
import vendorData from './vendorData';

// Sorry, this has become a maintanance nightmare. Abandon all hope.
const getDataForDinosView = () => new Promise((resolve, reject) => {
  dinoData.getDino().then((dinoResponse) => {
    staffData.getStaff().then((staffResponse) => {
      const dinoStuff = [];
      dinoResponse.forEach((dino) => {
        if (dino.staffId2 && dino.staffId) {
          const staffObject = staffResponse.find((staff) => staff.staffId === dino.staffId);
          const staffObject2 = staffResponse.find((staff) => staff.staffId === dino.staffId2);
          const staffUse = {
            staffName: staffObject.name,
            staffName2: staffObject2.name
          };
          dinoStuff.push({ ...dino, ...staffUse });
          resolve(dinoStuff);
        } else if (dino.staffId && !(dino.staffId2)) {
          const staffObject = staffResponse.find((staff) => staff.staffId === dino.staffId);
          const staffUse = {
            staffName: staffObject.name,
            staffName2: 'No second staff'
          };
          dinoStuff.push({ ...dino, ...staffUse });
          resolve(dinoStuff);
        } else if (dino.staffId2 && !(dino.staff)) {
          const staffObject2 = staffResponse.find((staff) => staff.staffId === dino.staffId2);
          const staffUse = {
            staffName: 'No staff',
            staffName2: staffObject2.name,
          };
          dinoStuff.push({ ...dino, ...staffUse });
          resolve(dinoStuff);
        } else {
          const staffUse = {
            staffName: 'No staff',
            staffName2: 'No second staff'
          };
          dinoStuff.push({ ...dino, ...staffUse });
          resolve(dinoStuff);
        }
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
        if (staffObject !== undefined) {
          const staffUse = {
            staffName: staffObject.name,
          };
          rideStuff.push({ ...ride, ...staffUse });
          resolve(rideStuff);
        } else {
          const staffUse = {
            staffName: 'No Staff Assigned',
          };
          rideStuff.push({ ...ride, ...staffUse });
          resolve(rideStuff);
        }
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
        if (staffObject !== undefined) {
          const staffUse = {
            staffName: staffObject.name,
          };
          vendorStuff.push({ ...vendor, ...staffUse });
          resolve(vendorStuff);
        } else {
          const staffUse = {
            staffName: 'No Staff Assigned',
          };
          vendorStuff.push({ ...vendor, ...staffUse });
          resolve(vendorStuff);
        }
      });
    });
  }).catch((error) => reject(error));
});

export default {
  getDataForDinosView, getDataForRidesView, getDataForVendorsView
};
