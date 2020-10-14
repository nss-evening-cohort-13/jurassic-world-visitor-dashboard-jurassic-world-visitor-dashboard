import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getVendors = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/vendors.json`)
    .then((response) => {
      const vendors = response.data;
      const vendorsArray = [];
      if (vendors) {
        Object.keys(vendors).forEach((vendorId) => {
          vendorsArray.push(vendors[vendorId]);
        });
      }
      resolve(vendorsArray);
    })
    .catch((error) => reject(error));
});

const addVendor = (vendorData) => axios.post(`${baseUrl}/vendor.json`, vendorData)
  .then((response) => {
    const firebaseKey = { vendorId: response.data.name };
    axios.patch(`${baseUrl}/vendor/${response.data.name}.json`, firebaseKey);
  }).catch((error) => console.warn(error));

export default { addVendor, getVendors };
