import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#navbar-logout-button').on('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    window.location.href = '/';
  });
};

const navbar = () => {
  $('#nav').html(
    `<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Jurassic World</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item mx-3" id="dino-link">
          <a class="nav-link" href="#"> Dinos</a>
        </li>
        <li class="nav-item mx-3" id="staff-link">
          <a class="nav-link" href="#"> Staff</a>
        </li>
        <li class="nav-item mx-3" id="rides-link">
          <a class="nav-link" href="#"> Rides</a>
        </li>
        <li class="nav-item mx-3" id="vendor-link">
          <a class="nav-link" href="#"> Vendors</a>
        </li>
        <li class="nav-item mx-3" id="equipment-link">
          <a class="nav-link" href="#"> Equipment</a>
        </li>
        <li class="nav-item mx-3" id="schedule-link">
          <a class="nav-link" href="#"> Schedule</a>
        </li>
      </ul>
        <ul class="navbar-nav ml-auto">
          <p class="nav-item active">
          <button class="nav-link btn btn-danger" id="chaos-monkey-button">Chaos Monkey</button>
          </p>
          <li class="nav-item active">
            <button class="nav-link btn btn-outline-danger" id="navbar-logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </nav>`
  );
  logoutEvent();
};

export default { navbar };
