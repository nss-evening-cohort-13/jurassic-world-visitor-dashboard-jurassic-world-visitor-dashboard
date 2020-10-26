import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addStaff = (staffData) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/staff.json`, staffData)
    .then((response) => {
      const fbKey = { staffId: response.data.name };
      axios
        .patch(`${baseUrl}/staff/${response.data.name}.json`, fbKey)
        .then(() => {
          resolve(response);
        });
    })
    .catch((error) => reject(error));
});

const getStaff = () => axios
  .get(`${baseUrl}/staff.json`)
  .then((response) => {
    const staffData = response.data;
    const staff = [];
    if (staffData) {
      Object.keys(staffData).forEach((staffId) => {
        staff.push(staffData[staffId]);
      });
    }
    return staff;
  })
  .catch((error) => console.warn(error));

const deleteStaff = (firebaseKey) => axios.delete(`${baseUrl}/staff/${firebaseKey}.json`);

const deleteValueFromStaff = (firebaseKey, objValue) => axios.delete(`${baseUrl}/staff/${firebaseKey}/${objValue}.json`);

const getSingleStaff = (staffId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/staff/${staffId}.json`)
    .then((response) => {
      resolve(response.data);
      console.warn(response);
    })
    .catch((error) => reject(error));
});

const getSingleStaffByStaffId = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="staffId"&equalTo="${staffId}"`)
    .then((response) => {
      const staff = Object.values(response.data);
      const thisStaff = staff[0];
      resolve(thisStaff);
    }).catch((error) => reject(error));
});

const updateStaff = (staffId, staffObj) => axios.patch(`${baseUrl}/staff/${staffId}.json`, staffObj);

export default {
  addStaff, getStaff, getSingleStaff, updateStaff, deleteStaff, getSingleStaffByStaffId, deleteValueFromStaff
};
