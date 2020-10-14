import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addRide = (data) => axios.post(`${baseUrl}/rides.json`, data)
  .then((response) => {
    const update = { rideId: response.data.name };
    axios.patch(`${baseUrl}/rides/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

export default { addRide };
