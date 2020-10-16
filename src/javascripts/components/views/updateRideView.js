import rideData from '../../helpers/data/rideData';
import form from '../forms/editRideForm';

const updateRideView = (rideFirebaseKey) => {
  rideData.getSingleRide(rideFirebaseKey).then((response) => {
    form.editRideForm(response);
  });
};

export default { updateRideView };
