import axios from 'axios';
import staffData from './staffData';

//  Gets data from firebase based on category specified in chaosMonkey
const randomEquipment = (category) => new Promise((resolve, reject) => {
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

  // then it passes that category into randomEquipment so that the correct database node can be returned
  randomEquipment(category)
    .then((response) => {
      //  a variable called selectedCat is defined here and defaults to broken the (name of object) since both rides and equipment break
      let selectedCat = `broken the ${response.name}`;
      //  if the response.name is noStaff, then the staff node is empty and has returned null. selectedCat is changed to an appropriate string to display
      if (response.name === 'noStaff') {
        selectedCat = 'no staff to kidnap';
        resolve(selectedCat);
      } else {
        //  selected can is redefined to the same default string here because the linter gets upset if you go straight into an if statement
        selectedCat = `broken the ${response.name}`;
        if (category === 'staff') {
          //  if the category is staff, the string updates, the card with a matching id is removed from the dom and deleted from the database
          selectedCat = `kidnapped ${response.name}`;
          $(`.card#${response.staffId}`).remove();
          staffData.deleteStaff(response.staffId);
          resolve(selectedCat);
        } else {
          resolve(selectedCat);
        }
      }
    })
    .catch((error) => reject(error));
});

export default { chaosMonkey };
