import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addEquipment = (equipmentData) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/equipment.json`, equipmentData)
    .then((response) => {
      const fbKey = { equipmentId: response.data.name, chaos: false };
      axios.patch(`${baseUrl}/equipment/${response.data.name}.json`, fbKey);
      resolve(response);
    })
    .catch((error) => reject(error));
});

const getEquipment = () => axios
  .get(`${baseUrl}/equipment.json`)
  .then((response) => {
    const equipmentData = response.data;
    const equipment = [];
    if (equipmentData) {
      Object.keys(equipmentData).forEach((equipmentId) => {
        equipment.push(equipmentData[equipmentId]);
      });
    }
    return equipment;
  })
  .catch((error) => console.warn(error));

const getSingleEquipment = (equipmentFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment/${equipmentFirebaseKey}.json`).then((response) => {
    const thisEquipment = response.data;
    resolve(thisEquipment);
  }).catch((error) => reject(error));
});

const editEquipment = (firebaseKey, equipmentObject) => axios.patch(`${baseUrl}/equipment/${firebaseKey}.json`, equipmentObject);

const deleteEquipment = (equipmentId) => axios.delete(`${baseUrl}/equipment/${equipmentId}.json`);

const classEquipment = (equipmentId) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/equipment/${equipmentId}.json`, { chaos: true })
    .then((response) => {
      const chaosMonkey = response.data.chaos;
      resolve(chaosMonkey);
    }).catch((error) => reject(error));
});

export default {
  addEquipment,
  getEquipment,
  getSingleEquipment,
  editEquipment,
  deleteEquipment,
  classEquipment
};
