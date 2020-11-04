function toggleText() {
  let toggleButton = document.getElementsByClassName('toggle-text-button')[0];
  let div = document.getElementById('text');

  toggleButton.addEventListener('click', () => {
    div.hidden = !div.hidden;
  });
}
