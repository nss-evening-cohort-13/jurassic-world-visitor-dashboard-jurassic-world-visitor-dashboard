# Jurassic World 
Welcome to Jurassic World! Please look through our stunning lists of dinosaurs, staff members, rides, vendors, and equipment. We definitely do NOT have a chaos monkey roaming around doing nefarious deeds so don't worry about that at all.

![image](https://i.imgur.com/hbES7N7.png)

## Details
When the user visits the application, they will see a page of Dinosaurs. They can visit any of the pages on the site, but are unable to make any changes. They are given the option to log in using Google in the Navbar. When logged in, the user has the option to add, edit and delete dinos, staff, vendors, equipment and rides.

## Code Example
The code below shows how the application displays the cards depending on whether the user is authenticated or not.

```const rideCardBuilder = () => {  
    const user = firebase.auth().currentUser;
  $('#cards').html('');
  rideData
    .getAllRides()
    .then((response) => {
      response.forEach((item) => {
        if (response.length) {
          if (user) {
            $('#cards').append(rideCardMaker(item));
          } else {
            $('#cards').append(unauthRideCardMaker(item)) 
          }
        } else {
          $('#cards').append('<h2> NO RIDES!</H2>');
        }
      });
    })
    .catch((error) => console.warn(error));
};
```

![image](https://i.imgur.com/UWE9TTq.gif)

## Technologies Used
HTML, JavaScipt, Bootstrap, Modules, SCSS, Firebase, Webpack, JQuery

## Wireframe
[Figma](https://www.figma.com/file/DYGUaGyGH2dt800TMjV0SX/Jarassic-World-Group-Project?node-id=0%3A1)

## ERD 
[LucidChart](https://lucid.app/lucidchart/1d58a68a-e968-4bce-8dab-983de541633a/edit?shared=true&page=0_0#)

## Color Palette
[Coolors.co](https://coolors.co/ef6461-e4b363-e8e9eb-e0dfd5-313638)

## Link
[Link](https://jurassic-world-eb567.web.app/)