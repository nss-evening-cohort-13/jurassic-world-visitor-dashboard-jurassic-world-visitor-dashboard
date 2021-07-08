import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getVendors = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/vendor.json`)
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

const addVendor = (vendorData) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/vendor.json`, vendorData)
    .then((response) => {
      const firebaseKey = { vendorId: response.data.name };
      axios.patch(`${baseUrl}/vendor/${response.data.name}.json`, firebaseKey);
      resolve(response);
    }).catch((error) => reject(error));
});

const getSingleVendor = (vendorId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendor/${vendorId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const getStaffVendor = (staffUid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/vendor.json?orderBy="staffId"&equalTo="${staffUid}"`)
    .then((response) => {
      const staffVendor = response.data;
      const vendor = [];
      if (staffVendor) {
        Object.keys(staffVendor).forEach((rideId) => {
          vendor.push(staffVendor[rideId]);
        });
      }
      resolve(vendor);
    }).catch((error) => reject(error));
});

const updateVendor = (vendorId, vendorObj) => axios.patch(`${baseUrl}/vendor/${vendorId}.json`, vendorObj);

const deleteVendor = (vendorId) => {
  axios.delete(`${baseUrl}/vendor/${vendorId}.json`);
};

export default {
  addVendor, getVendors, getSingleVendor, updateVendor, deleteVendor, getStaffVendor
};
