import equipmentData from './equipmentData';

const randomEquipment = () => {
  equipmentData.getEquipment().then((response) => {
    const arrayLength = response.length;
    const randomNumber = Math.floor(Math.random() * arrayLength);
    const brokenEquipment = response[randomNumber].name;
    console.warn(brokenEquipment);
    return brokenEquipment;
  });
};

const chaosMonkey = () => {
  const category = Math.floor(Math.random() * 3);
  if (category >= 0) {
    randomEquipment();
    console.warn(randomEquipment());
  } else {
    console.warn('something else broke');
  }
};

console.warn(randomEquipment());

export default { chaosMonkey };
