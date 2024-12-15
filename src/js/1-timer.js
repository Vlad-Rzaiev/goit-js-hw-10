import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      startBtn.setAttribute('disabled', 'true');
      startBtn.classList.replace('start-btn-active', 'start-btn-disable');
      iziToast.show({
        title: 'Error!',
        titleColor: '#ffffff',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        backgroundColor: ' #ef4040',
        icon: `<svg width="24" height="24">
                <use xlink:href="../img/icons.svg#icon-close"></use>
               </svg>`,
        position: 'topRight',
        timeout: 55000,
      });
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.classList.replace('start-btn-disable', 'start-btn-active');

      userSelectedDate = selectedDates[0];
      // const timer = userSelectedDate - Date.now();

      console.log(convertMs(userSelectedDate - Date.now()));
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputDate, options);
