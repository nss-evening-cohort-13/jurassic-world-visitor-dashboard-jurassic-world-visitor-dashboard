import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addStaff = (staffData) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/staff.json`, staffData)
    .then((response) => {
      const fbKey = { staffId: response.data.name };
      axios.patch(`${baseUrl}/staff/${response.data.name}.json`, fbKey);
      resolve(response);
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

const getSingleStaff = (staffId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/staff/${staffId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updateStaff = (staffId, staffObj) => axios.patch(`${baseUrl}/staff/${staffId}.json`, staffObj);

export default {
  addStaff, getStaff, getSingleStaff, updateStaff
};
