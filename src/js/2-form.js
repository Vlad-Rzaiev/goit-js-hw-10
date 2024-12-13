const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const input = form.elements.email;
const textArea = form.elements.message;
const localKey = 'feedback-form-state';

const savedData = localStorage.getItem(localKey);

document.addEventListener('DOMContentLoaded', () => {
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    input.value = parsedData.email ?? '';
    textArea.value = parsedData.message ?? '';

    formData.email = parsedData.email;
    formData.message = parsedData.message;
  }
});

form.addEventListener('input', ev => {
  const form = ev.target;

  if (form.name === 'email') {
    formData.email = form.value.trim();
  } else if (form.name === 'message') {
    formData.message = form.value.trim();
  }

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', ev => {
  ev.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);

    localStorage.removeItem(localKey);
    formData.email = '';
    formData.message = '';
    form.reset();
  }
});
