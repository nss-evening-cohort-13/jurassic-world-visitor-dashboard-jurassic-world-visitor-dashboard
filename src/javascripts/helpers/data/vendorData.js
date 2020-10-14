import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addVendor = (vendorData) => axios.post(`${baseUrl}/vendor.json`, vendorData)
  .then((response) => {
    const firebaseKey = { vendorId: response.data.name };
    axios.patch(`${baseUrl}/vendor/${response.data.name}.json`, firebaseKey);
  }).catch((error) => console.warn(error));

export default { addVendor };
