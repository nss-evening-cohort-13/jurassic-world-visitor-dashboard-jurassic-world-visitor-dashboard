import 'bootstrap';
import chaosData from '../../helpers/data/chaosData';

const chaosView = () => {
  chaosData.chaosMonkey().then((response) => {
    $('#toast').html(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000"">
    <div class="toast-header">
      <strong class="mr-auto">Chaos Monkey has ${response}</strong>
      <small>Just now</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>`);
    $('.toast').toast('show');
  });
};

export default { chaosView };
