import axios from 'axios';
import apiKeys from '../apiKeys.json';
import equipmentData from './equipmentData';
import rideData from './rideData';
import staffData from './staffData';
import dinoData from './dinoData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

//  Gets data from firebase based on category specified in chaosMonkey
const randomItem = (category) => new Promise((resolve, reject) => {
  axios
    .get(`https://nutshell-part-two.firebaseio.com/${category}.json`)
    .then((response) => {
      if (response.data !== null) {
        //  if there is data in the response, a random object from the array is passed into chaosMonkey
        const arrayLength = Object.values(response.data).length;
        const randomNumber = Math.floor(Math.random() * arrayLength);
        const chaotic = Object.values(response.data)[randomNumber];
        resolve(chaotic);
      } else {
        //  if the response is null, it means there are no staff in the database and a dummy object is passed to chaosMonkey
        const chaotic = { name: 'noStaff' };
        resolve(chaotic);
      }
    })
    .catch((error) => reject(error));
});

//  chaosMonkey first selects a staff, ride or equipment to affect
const chaosMonkey = () => new Promise((resolve, reject) => {
  const chaosArray = ['staff', 'equipment', 'rides'];
  const category = chaosArray[Math.floor(Math.random() * 3)];
  // then it passes that category into randomItem so that the correct database node can be returned
  randomItem(category)
    .then((response) => {
      //  a variable called selectedCat is defined here and defaults to broken the (name of object) since both rides and equipment break
      let selectedCat = `broken the ${response.name}`;
      //  if the response.name is noStaff, then the staff node is empty and has returned null. selectedCat is changed to an appropriate string to display
      if (response.name === 'noStaff') {
        selectedCat = 'taken a day off';
        resolve(selectedCat);
      } else {
        //  selected can is redefined to the same default string here because the linter gets upset if you go straight into an if statement
        selectedCat = `broken the ${response.name}`;
        if (category === 'staff') {
          //  if the category is staff, the string updates, the card with a matching id is removed from the dom and deleted from the database
          selectedCat = `kidnapped ${response.name}`;
          $(`.card#${response.staffId}`).remove();
          dinoData.getDino(response.staffId).then((dinoResponse) => {
            dinoResponse.forEach((dino) => {
              if (response.staffId === dino.staffId) {
                axios.delete(`${baseUrl}/dinos/${response.dinoId}/staffId.json`);
              } else if (response.staffId === dino.staffId2) {
                axios.delete(`${baseUrl}/dinos/${response.dinoId}/staffId2.json`);
              }
            });
          });
          staffData.deleteStaff(response.staffId);
          resolve(selectedCat);
        } else if (category === 'equipment') {
          selectedCat = `broken the ${response.name}`;
          // The selected category of equipment will take the function of class equipment take the item(response and name), then if the object of chaos returns true it will add a class of invisible.
          equipmentData.classEquipment(response.equipmentId)
            .then((invisibleChaos) => {
              if (invisibleChaos === true) {
                $(`.button-body#${response.equipmentId}`).addClass('invisible');
                axios.patch(`${baseUrl}/equipment/${response.equipmentId}.json`, { staffId: 'disabled' })
                  .then(() => {
                    axios.delete(`${baseUrl}/staff/${response.equipmentId}.json`);
                    axios.delete(`${baseUrl}/staff/${response.staffId}/equipmentId.json`);
                    axios.delete(`${baseUrl}/staff/${response.staffId}/equipmentName.json`);
                  });
              }
            });
        } else if (category === 'rides') {
          selectedCat = `broken the ${response.name}`;
          rideData.breakRides(response.rideId)
            .then((fadedRide) => {
              if (fadedRide === true) {
                $(`.button-body#${response.rideId}`).addClass('invisible');
                $(`.staff-name#${response.rideId}`).addClass('invisible');
                $(`.card#${response.rideId}`).addClass('card-fade');
                axios.patch(`${baseUrl}/rides/${response.rideId}.json`, { staffId: 'disabled' })
                  .then(() => {
                    axios.delete(`${baseUrl}/staff/${response.equipmentId}.json`);
                    axios.delete(`${baseUrl}/staff/${response.staffId}/rideId.json`);
                    axios.delete(`${baseUrl}/staff/${response.staffId}/rideName.json`);
                  });
              }
            });
        }
        resolve(selectedCat);
      }
    })
    .catch((error) => reject(error));
});
export default { chaosMonkey };
