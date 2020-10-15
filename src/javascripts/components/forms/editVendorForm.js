// import vendorData from '../../helpers/data/vendorData';
import vendorView from '../views/vendorView';

const editVendorForm = (vendorId) => {
  $('#cards').prepend(`<div class="modal fade" id="editVendorModal" tabindex="-1" role="dialog" aria-labelledby="editVendorLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title: ${vendorId}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`);

  vendorView.vendorView();
};

export default { editVendorForm };
