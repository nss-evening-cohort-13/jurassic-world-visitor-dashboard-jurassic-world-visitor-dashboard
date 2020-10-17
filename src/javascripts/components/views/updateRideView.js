import rideData from '../../helpers/data/rideData';
import form from '../forms/editRideForm';

const updateRideView = (rideFirebaseKey) => new Promise((resolve, reject) => {
  rideData.getSingleRide(rideFirebaseKey)
    .then((response) => {
      resolve(form.editRideForm(response));
    }).catch((error) => reject(error));
});

export default { updateRideView };
