const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const textbox = document.querySelector('#textbox');
const instructions = document.querySelector('#instructions');
let content = '';
recognition.continuous = true;
recognition.onaudiostart = function () {
  instructions.textContent = 'Voice Recognition is On';
};
recognition.onspeechend = function () {
  instructions.textContent = 'Voice Recognition is Off';
};
recognition.onerror = function () {
  instructions.textContent = 'Try Again';
};
recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content += transcript;
  textbox.value = content;
};
const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', function (event) {
  if (content.length) {
    content += ' ';
  }
  recognition.start();
});
const pauseButton = document.querySelector('#pause-btn');
pauseButton.addEventListener('click', function (event) {
  recognition.stop();
  instructions.textContent = 'Voice Recognition is Off';
});

const voiceList = document.querySelector('#voiceList');
const txtInput = document.querySelector('#text-to-speech-textbox');
const btnSpeak = document.querySelector('#btn-speak');

const speechSynthesis = window.speechSynthesis;
let voices = [];

GetVoices();
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = GetVoices;
}
btnSpeak.addEventListener('click', () => {
  const toSpeak = new SpeechSynthesisUtterance(txtInput.value);
  const selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
  voices.forEach(voice => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  speechSynthesis.speak(toSpeak);
});
function GetVoices() {
  voices = speechSynthesis.getVoices();
  voiceList.innerHTML = '';
  voices.forEach(voice => {
    const listItem = document.createElement('option');
    listItem.textContent = voice.name;
    listItem.setAttribute('data-lang', voice.lang);
    listItem.setAttribute('data-name', voice.name);
    voiceList.appendChild(listItem);
  });
  voiceList.selectedIndex = 0;
}

const recordAudioFileImg = document.querySelector('#record-audio-file');
const homepage = document.querySelector('.homepage');
const recordAudioView = document.querySelector('.record-audio-view');
const textToSpeechView = document.querySelector('.text-to-speech');
const textToSpeechImg = document.querySelector('#text-to-speech');
recordAudioFileImg.addEventListener('click', changeView);
textToSpeechImg.addEventListener('click', changeView);
function changeView(event) {
  if (event.target.matches('#record-audio-file')) {
    homepage.classList = 'homepage hidden';
    recordAudioView.classList = 'record-audio-view';
  }
  if (event.target.matches('#text-to-speech')) {
    homepage.classList = 'homepage hidden';
    textToSpeechView.classList = 'text-to-speech-view';
  }
}
const logoImageTwo = document.querySelector('.logo-image-two');
const logoImageThree = document.querySelector('.logo-image-three');
logoImageThree.addEventListener('click', goToHomepage);
logoImageTwo.addEventListener('click', goToHomepage);
function goToHomepage(event) {
  if (event.target.matches('.logo-image-two')) {
    homepage.classList = 'homepage';
    recordAudioView.classList = 'record-audio-view hidden';
  }
  if (event.target.matches('.logo-image-three')) {
    homepage.classList = 'homepage';
    textToSpeechView.classList = 'text-to-speech-view hidden';
  }
}

function getLocalStream() {
  navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
    window.localStream = stream;
  }).catch(err => {
    console.error(err);
  });
}
getLocalStream();
