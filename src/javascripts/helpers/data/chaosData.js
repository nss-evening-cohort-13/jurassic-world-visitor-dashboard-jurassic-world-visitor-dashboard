import axios from 'axios';

const randomEquipment = (category) => new Promise((resolve, reject) => {
  axios
    .get(`https://nutshell-part-two.firebaseio.com/${category}.json`)
    .then((response) => {
      const arrayLength = Object.values(response.data).length;
      const randomNumber = Math.floor(Math.random() * arrayLength);
      const choatic = Object.values(response.data)[randomNumber];
      resolve(choatic);
    })
    .catch((error) => reject(error));
});

const chaosMonkey = () => new Promise((resolve, reject) => {
  const chaosArray = ['staff', 'equipment', 'rides'];
  const category = chaosArray[Math.floor(Math.random() * 3)];

  randomEquipment(category)
    .then((response) => {
      let selectedCat = `broken the ${response.name}`;

      if (category === 'staff') {
        selectedCat = `kidnapped ${response.name}`;
      } else if (category === 'rides') {
        selectedCat = `broken the ${response.name}`;
        console.warn(response.rideId);
      }
      resolve(selectedCat);
    })
    .catch((error) => reject(error));
});

export default { chaosMonkey };
