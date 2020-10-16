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

const editRide = (firebaseKey, rideObject) => axios.patch(`${baseUrl}/rides/${firebaseKey}.json`, rideObject);

export default {
  addRide, getAllRides, editRide, getSingleRide
};
