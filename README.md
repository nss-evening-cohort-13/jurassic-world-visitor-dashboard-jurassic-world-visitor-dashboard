# Jurassic World 
Welcome to Jurassic World! Please look through our stunning lists of dinosaurs, staff members, rides, vendors, and equipment. We definitely do NOT have a chaos monkey roaming around doing nefarious deeds so don't worry about that at all.

![image](https://i.imgur.com/hbES7N7.png)

![demo](gifs/demoJurassic.gif)

## Details
When the user visits the application, they will see a page of dinosaurs. They can visit any of the pages on the site, but are unable to make any changes. They are given the option to log in using Google in the Navbar. When logged in, the user has the option to add, edit and delete dinos, staff, vendors, equipment and rides. The user has the ability to assign equipment to staff and staff to rides and vendors. Two staff members are required for each dinosaur. 

## Code Example
The code below shows how the Chaos Monkey chooses a random staff to kidnap or ride/equipment to disable within application.

````javascript
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
````

## Original Gif

![image](https://i.imgur.com/UWE9TTq.gif)

## Technologies Used
HTML, JavaScipt, Bootstrap, Modules, SCSS, Firebase, Webpack, JQuery

## Wireframe
[Figma](https://www.figma.com/file/DYGUaGyGH2dt800TMjV0SX/Jurassic-World-Group-Project?node-id=0%3A1)

## ERD 
![Screenshot](https://user-images.githubusercontent.com/67588177/97781560-5874fa80-1b5a-11eb-84e8-f36dc9229733.png)

## Link
Newest:
Group 3 [Link](https://nutshell-part-two.web.app/)

Original (CRUD only):
Group 2 [Link](https://jurassic-world-eb567.web.app/)
