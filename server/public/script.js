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

const recordAudioFileImg = document.querySelector('#record-audio-file');
const homepage = document.querySelector('.homepage');
const recordAudioView = document.querySelector('.record-audio-view');
recordAudioFileImg.addEventListener('click', changeView);
function changeView(event) {
  if (event.target.matches('#record-audio-file')) {
    homepage.classList = 'homepage hidden';
    recordAudioView.classList = 'record-audio-view';
  }
}
const logoImageTwo = document.querySelector('.logo-image-two');
logoImageTwo.addEventListener('click', goToHomepage);
function goToHomepage(event) {
  if (event.target.matches('.logo-image-two')) {
    homepage.classList = 'homepage';
    recordAudioView.classList = 'record-audio-view hidden';
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
