import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addStaff = (staffData) => axios.post(`${baseUrl}/staff.json`, staffData)
  .then((response) => {
    const fbKey = { staffId: response.data.name };
    axios.patch(`${baseUrl}/staff/${response.data.name}.json`, fbKey);
  }).catch((error) => console.warn(error));

export default { addStaff };
