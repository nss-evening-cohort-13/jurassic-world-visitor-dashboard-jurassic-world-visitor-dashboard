import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addEquipment = (equipmentData) => axios.post(`${baseUrl}/equipment.json`, equipmentData)
  .then((response) => {
    const fbKey = { equipmentId: response.data.name };
    axios.patch(`${baseUrl}/equipment/${response.data.name}.json`, fbKey);
  }).catch((error) => console.warn(error));

export default { addEquipment };
