// import equipmentData from './equipmentData';
import axios from 'axios';

const randomEquipment = (category) => new Promise((resolve, reject) => {
  axios
    .get(`https://nutshell-part-two.firebaseio.com/${category}.json`)
    .then((response) => {
      console.warn(response);
      const arrayLength = Object.values(response.data).length;
      const randomNumber = Math.floor(Math.random() * arrayLength);
      const choatic = Object.values(response.data)[randomNumber];
      resolve(choatic.name);
    })
    .catch((error) => reject(error));

  // equipmentData
  //   .getEquipment()
  //   .then((response) => {
  //     const arrayLength = response.length;
  //     const randomNumber = Math.floor(Math.random() * arrayLength);
  //     const brokenEquipment = response[randomNumber];
  //     resolve(brokenEquipment);
  //   })
  //   .catch((error) => reject(error));
});

const chaosMonkey = () => new Promise((resolve, reject) => {
  const chaosArray = ['staff', 'equipment', 'rides'];
  const category = chaosArray[Math.floor(Math.random() * 3)];

  // TODO: Update the string/resolve based on the selected category
  randomEquipment(category)
    .then((response) => {
      let selectedCat = `broken the ${response}`;
      if (category === 'staff') {
        selectedCat = `kidnapped ${response}`;
      }
      //   selectedCat = ...
      // else if equeueMicrotask...
      //   ...

      resolve(selectedCat);
    })
    .catch((error) => reject(error));

  // let x;
  // if (category === 0) {
  //   x = randomEquipment().then((param) => param);
  // }
  // x.then((response) => resolve(response.name)).catch((error) => reject(error));
});

export default { chaosMonkey };
