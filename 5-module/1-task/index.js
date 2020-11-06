function hideSelf() {
  let hideButton = document.getElementsByClassName('hide-self-button')[0];
  hideButton.addEventListener('click', () => hideButton.hidden = 'true');
}
