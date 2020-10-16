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

export default { addRide, getAllRides, deleteRides };
