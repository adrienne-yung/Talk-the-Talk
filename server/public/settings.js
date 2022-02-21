const moonlitAsteroid = document.querySelector('.moonlit-asteroid');
const galaxySunset = document.querySelector('.love-tonight');
const darkOcean = document.querySelector('.dark-ocean');
const defaultBackground = document.querySelector('.default-background');
const colorPickerColorOne = document.querySelector('.color-picker-one');
const colorPickerColorTwo = document.querySelector('.color-picker-two');
const colorPickerColorThree = document.querySelector('.color-picker-three');
const colorPickerColorFour = document.querySelector('.color-picker-four');
const instructions = document.querySelector('#instructions');
const selectVoiceSpan = document.querySelector('.select-voice-span');

moonlitAsteroid.addEventListener('click', changeBackgroundColor);
galaxySunset.addEventListener('click', changeBackgroundColor);
darkOcean.addEventListener('click', changeBackgroundColor);
defaultBackground.addEventListener('click', changeBackgroundColor);
function changeBackgroundColor(event) {
  if (event.target.matches('.moonlit-asteroid')) {
    document.body.style.backgroundImage = 'linear-gradient(-45deg, ' + '#0f2027' + ', ' + '#203a43' + ', ' + '#2c5364' + ', ' + '#2c687d' + ', ' + '#4597b4' + ')';
    colorPickerColorOne.style.color = 'white';
    colorPickerColorTwo.style.color = 'white';
    colorPickerColorThree.style.color = 'white';
    colorPickerColorFour.style.color = 'white';
    instructions.style.color = 'white';
    selectVoiceSpan.style.color = 'white';
    document.body.style.animation = 'gradient 15s ease infinite';
  }
  if (event.target.matches('.love-tonight')) {
    document.body.style.backgroundImage = 'linear-gradient(-45deg, ' + '#4568dc' + ', ' + '#b06ab3' + ')';
    colorPickerColorOne.style.color = 'black';
    colorPickerColorTwo.style.color = 'black';
    colorPickerColorThree.style.color = 'black';
    colorPickerColorFour.style.color = 'black';
    instructions.style.color = 'black';
    selectVoiceSpan.style.color = 'black';
    document.body.style.animation = 'gradient 15s ease infinite';
  }
  if (event.target.matches('.dark-ocean')) {
    document.body.style.backgroundImage = 'linear-gradient(-45deg, ' + '#373b44' + ', ' + '#4286f4' + ')';
    colorPickerColorOne.style.color = 'white';
    colorPickerColorTwo.style.color = 'white';
    colorPickerColorThree.style.color = 'white';
    colorPickerColorFour.style.color = 'white';
    instructions.style.color = 'white';
    selectVoiceSpan.style.color = 'white';
    document.body.style.animation = 'gradient 15s ease infinite';
  }
  if (event.target.matches('.default-background')) {
    document.body.style.backgroundImage = 'linear-gradient(-45deg, ' + '#8d86cf' + ', ' + '#8b90d4' + ', ' + '#9dbeee' + ', ' + '#a1bcee' + ', ' + '#c7aed8' + ',' + '#a7aedf' + ')';
    colorPickerColorOne.style.color = 'black';
    colorPickerColorTwo.style.color = 'black';
    colorPickerColorThree.style.color = 'black';
    colorPickerColorFour.style.color = 'black';
    instructions.style.color = 'black';
    selectVoiceSpan.style.color = 'black';
    document.body.style.animation = 'gradient 15s ease infinite';
  }
}
