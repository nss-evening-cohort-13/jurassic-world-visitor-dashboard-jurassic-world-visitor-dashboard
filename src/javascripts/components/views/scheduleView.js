import dinoData from '../../helpers/data/dinoData';
import staffData from '../../helpers/data/staffData';
import vendorData from '../../helpers/data/vendorData';
import rideData from '../../helpers/data/rideData';
import mergedData from '../../helpers/data/mergedData';

const staffCal = () => {
  staffData.getStaff().then((response) => {
    if (response.length) {
      response.forEach((staff) => {
        if (staff.dinoId) {
          dinoData.getSingleDino(staff.dinoId)
            .then((dinoResponse) => {
              const job = dinoResponse.name;
              $('#staff-cal').append(`
                  <tr>
                    <th scope="row" class="staff-info-cal">
                      <div class="cal-name">${staff.name}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                  </tr>
                `);
            });
        } else if (staff.rideId) {
          rideData.getSingleRide(staff.rideId)
            .then((rideResponse) => {
              const job = rideResponse.name;
              $('#staff-cal').append(`
                  <tr>
                    <th scope="row" class="staff-info-cal">
                      <div class="cal-name">${staff.name}</div>
                    </th>
                    <th scope="row" class="staff-job cal-ride">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                    <th  scope="row" class="staff-job cal-dino">
                      <div class="assignment">${job}</div>
                    </th>
                  </tr>
                `);
            });
        } else if (staff.vendorId) {
          vendorData.getSingleVendor(staff.vendorId)
            .then((vendorResponse) => {
              const job = vendorResponse.name;
              $('#staff-cal').append(`
                  <tr>
                    <th scope="row" class="staff-info-cal">
                      <div class="cal-name">${staff.name}</div>
                    </th>
                    <th scope="row"class="staff-job  cal-vendor">
                      <div class="assignment">${job}</div>
                    </th>
                    <th scope="row">${job}</th>
                    <th scope="row">${job}</th>
                    <th scope="row">${job}</th>
                    <th scope="row">${job}</th>
                    <th scope="row">${job}</th>
                  </tr>
                `);
            });
        } else {
          $('#us-list').append(`
            <li class"us-staff>${staff.name}</li>
          `);
        }
      });
    } else {
      $('#app').append('<h2>NO STAFF</h2>');
    }
  });
  mergedData.getAllJobs().then((jobsResponse) => {
    jobsResponse.forEach((jobCat) => {
      jobCat.forEach((job) => {
        if (!(job.staffId) || (job.staffId === 'disabled')) {
          $('#uj-list').append(`
          <li class"us-staff>${job.name}</li>
        `);
        }
      });
    });
  });
};

const calBuilder = () => {
  $('#app').html(`
<div id="cal">
  <div id="est-finish-dates">
  <thead>
    <table class="table" id="staff-cal">
      <tr>
        <th class="staff" scope="col">Staff Name<br/></th>
        <th scope="col">Sunday<br/></th>
        <th scope="col">Monday<br/></th>
        <th scope="col">Tuesday<br/></th>
        <th scope="col">Wednesday<br/></th>
        <th scope="col">Thursday<br/></th>
        <th scope="col">Friday<br/></th>
        <th scope="col">Saturday<br/></th>
      </tr>
    </table>
    </thead>
  </div>
</div>
<div id="us-list-view">
  <div class="us-title">
    <h3>Unnassigned Staff</h3>
  </div>
  <ul id="us-list"></ul>
<div id="uj-list-view">
  <div class="uj-title">
    <h3>Unstaffed Jobs</h3>
  </div>
  <ul id="uj-list"></ul>

`);
  staffCal();
};

export default { calBuilder };
