import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addDino = (dinoData) => axios.post(`${baseUrl}/dinos.json`, dinoData)
  .then((response) => {
    const fbKey = { dinoId: response.data.name };
    axios.patch(`${baseUrl}/dinos/${response.data.name}.json`, fbKey);
  }).catch((error) => console.warn(error));

export default { addDino };
