import staffData from './staffData';
import dinoData from './dinoData';

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

const getSingleStaffView = (staffUid) => new Promise((resolve, reject) => {
  staffData.getSingleStaff(staffUid)
    .then((staffResponse) => {
      dinoData.getStaffDinos(staffResponse.uid)
        .then((dinoResponse) => {
          const finalObject = { staff: staffResponse, dinos: dinoResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

export default { getDataForDinosView, getSingleStaffView };
