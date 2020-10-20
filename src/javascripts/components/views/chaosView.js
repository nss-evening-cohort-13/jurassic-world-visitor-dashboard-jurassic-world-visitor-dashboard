import 'bootstrap';

const chaosView = () => {
  $('#toast').html(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000"">
  <div class="toast-header">
    <strong class="mr-auto">Chaos Monkey has struck</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>`);
  $('.toast').toast('show');
};

export default { chaosView };
