import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addDino = (dinoData) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/dinos.json`, dinoData)
    .then((response) => {
      const fbKey = { dinoId: response.data.name };
      axios.patch(`${baseUrl}/dinos/${response.data.name}.json`, fbKey);
      resolve(response);
    })
    .catch((error) => reject(error));
});

const getDino = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/dinos.json`)
    .then((response) => {
      const dinoData = response.data;
      const dinos = [];
      if (dinoData) {
        Object.keys(dinoData).forEach((dinoId) => {
          dinos.push(dinoData[dinoId]);
        });
      }
      resolve(dinos);
    })
    .catch((error) => reject(error));
});

const getStaffDinos = (staffId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/dinos.json?orderBy="staffId"&equalTo="${staffId}"`)
    .then((response) => {
      const staffDinos = response.data;
      const dinos = [];
      if (staffDinos) {
        Object.keys(staffDinos).forEach((dinoId) => {
          dinos.push(staffDinos[dinoId]);
        });
      }
      resolve(dinos);
    }).catch((error) => reject(error));
});

const getSingleDino = (dinoFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinos/${dinoFirebaseKey}.json`).then((response) => {
    const thisDino = response.data;
    resolve(thisDino);
  }).catch((error) => reject(error));
});

const editDino = (firebaseKey, dinoObject) => axios.patch(`${baseUrl}/dinos/${firebaseKey}.json`, dinoObject);

const deleteDino = (dinoId) => axios.delete(`${baseUrl}/dinos/${dinoId}.json`);

const deleteValueFromDino = (firebaseKey, objValue) => axios.delete(`${baseUrl}/dino/${firebaseKey}/${objValue}.json`);

export default {
  addDino, getDino, editDino, getSingleDino, deleteDino, getStaffDinos, deleteValueFromDino
};
