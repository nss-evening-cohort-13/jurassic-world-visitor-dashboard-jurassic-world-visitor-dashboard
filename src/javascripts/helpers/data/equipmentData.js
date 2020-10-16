import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addEquipment = (equipmentData) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/equipment.json`, equipmentData)
    .then((response) => {
      const fbKey = { equipmentId: response.data.name };
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

export default { addEquipment, getEquipment };
