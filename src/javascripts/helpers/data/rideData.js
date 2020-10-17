import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addRide = (data) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/rides.json`, data)
    .then((response) => {
      const update = { rideId: response.data.name };
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

<<<<<<< HEAD:src/javascripts/helpers/data/ridesData.js
export default { addRide, getAllRides, deleteRides };
=======
const getSingleRide = (rideFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides/${rideFirebaseKey}.json`).then((response) => {
    const thisRide = response.data;
    resolve(thisRide);
  }).catch((error) => reject(error));
});

const editRide = (firebaseKey, rideObject) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/rides/${firebaseKey}.json`, rideObject)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

export default {
  addRide, getAllRides, editRide, getSingleRide
};
>>>>>>> e9eaa22e1f3d326c761d15b46dbadf7ea2401d1d:src/javascripts/helpers/data/rideData.js
