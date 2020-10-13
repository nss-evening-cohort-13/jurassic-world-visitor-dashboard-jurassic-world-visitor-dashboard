import vendorData from '../../helpers/data/vendorData';
// import vendor from '../cards/vendorCards';

const vendorView = (vendorUid) => {
  $('#app').append('<button type="button" class="btn btn-warning back" id="back">Back</button>');
  vendorData.addVendor(vendorUid).then((response) => {
    if (response.length) {
      response.forEach((vendor) => {
        $('#app').append(vendor.vendorMaker(vendor));
      });
    } else {
      $('#app').append('<h2>NO VENDORS</h2>');
    }
  });
};

export default { vendorView };
