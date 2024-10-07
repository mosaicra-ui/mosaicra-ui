// Optionally, you can add interactivity such as button click events here.

const messageButtons = document.querySelectorAll('.message-btn');
const followButtons = document.querySelectorAll('.follow-btn');

messageButtons.forEach(button => {
  button.addEventListener('click', () => {
    alert('Message button clicked!');
  });
});

followButtons.forEach(button => {
  button.addEventListener('click', () => {
    alert('Follow button clicked!');
  });
});
