import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addRide = (data) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/rides.json`, data)
    .then((response) => {
      const update = { rideId: response.data.name, chaos: false };
      axios.patch(`${baseUrl}/rides/${response.data.name}.json`, update);
      resolve(response);
    })
    .catch((error) => reject(error));
});

const deleteRides = (firebaseKey) => axios.delete(`${baseUrl}/rides/${firebaseKey}.json`);

const getAllRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`).then((response) => {
    const rideObjects = response.data;
    const rides = [];
    if (rideObjects) {
      Object.keys(rideObjects).forEach((rideKey) => {
        rides.push(rideObjects[rideKey]);
      });
    }
    resolve(rides);
  }).catch((error) => reject(error));
});

const getSingleRide = (rideFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides/${rideFirebaseKey}.json`).then((response) => {
    const thisRide = response.data;
    resolve(thisRide);
  }).catch((error) => reject(error));
});

const getStaffRides = (staffUid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/rides.json?orderBy="staffUid"&equalTo="${staffUid}"`)
    .then((response) => {
      const staffRides = response.data;
      const rides = [];
      if (staffRides) {
        Object.keys(staffRides).forEach((rideId) => {
          rides.push(staffRides[rideId]);
        });
      }
      resolve(rides);
    }).catch((error) => reject(error));
});

const editRide = (firebaseKey, rideObject) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/rides/${firebaseKey}.json`, rideObject)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const breakRides = (rideId) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/rides/${rideId}.json`, { chaos: true })
    .then((response) => {
      const chaosRides = response.data.chaos;
      resolve(chaosRides);
    }).catch((error) => reject(error));
});
export default {
  addRide,
  getAllRides,
  editRide,
  getSingleRide,
  deleteRides,
  breakRides,
  getStaffRides
};
