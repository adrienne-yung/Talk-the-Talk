// import Recorder from './recorder.js';
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
// const startButton = document.querySelector('#start-btn');
// startButton.addEventListener('click', function (event) {
//   if (content.length) {
//     content += ' ';
//   }
//   recognition.start();
// });
// const pauseButton = document.querySelector('#pause-btn');
// pauseButton.addEventListener('click', function (event) {
//   recognition.stop();
//   instructions.textContent = 'Voice Recognition is Off';
// });

const URL = window.URL || window.webkitURL;
let gumStream;
let rec;
let input;
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;
const stopButton = document.querySelector('#stop-btn');
stopButton.addEventListener('click', stopRecording);

const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', startRecording);
function startRecording() {
  const constraints = {
    audio: true,
    video: false
  };
  startButton.disabled = true;
  stopButton.disabled = false;
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    audioContext = new AudioContext();
    document.getElementById('formats').innerHTML = 'Format: 1 channel pcm @ ' + audioContext.sampleRate / 1000 + 'kHz';
    gumStream = stream;
    input = audioContext.createMediaStreamSource(stream);
    rec = new MediaRecorder(input, {
      numChannels: 1
    });
    rec.record();
  })
    .catch(e => {
      console.error(e);
    });
}

startButton.addEventListener('click', function (event) {
  if (content.length) {
    content += ' ';
  }
  recognition.start();
});

function stopRecording() {
  stopButton.disabled = true;
  startButton.disabled = false;
  recognition.stop();
  instructions.textContent = 'Voice Recognition is Off';
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  rec.exportWAV(createDownloadLink);
  createDownloadLink();
}

const recordingList = document.querySelector('#recording-list');
function createDownloadLink(blob) {
  const url = URL.createObjectURL(blob);
  const au = document.createElement('audio');
  const li = document.createElement('li');
  const link = document.createElement('a');
  au.controls = true;
  au.src = url;
  link.href = url;
  link.download = new Date().toISOString() + '.wav';
  link.innerHTML = link.download;
  li.appendChild(au);
  li.appendChild(link);
  const filename = new Date().toISOString();
  const upload = document.createElement('a');
  upload.href = '#';
  upload.addEventListener('click', function (event) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      if (this.readyState === 4) {
        // eslint-disable-next-line no-console
        console.log('Server Returned: ', e.target.responseText);
      }
    };
    const fd = new FormData();
    fd.append('audio_data', blob, filename);
    xhr.open('POST', 'upload.php', true);
    xhr.send(fd);
  });
  li.appendChild(document.createTextNode(' '));
  li.appendChild(upload);
  recordingList.appendChild(li);
}
// const startButton = document.querySelector('#start-btn');
// startButton.addEventListener('click', function (event) {
//   if (content.length) {
//     content += ' ';
//   }
//   recorder.start();
//   recognition.start();
// });
// const pauseButton = document.querySelector('#pause-btn');
// pauseButton.addEventListener('click', function (event) {
//   recorder.stop().getMp3().then(([buffer, blob]) => {
//     // eslint-disable-next-line no-console
//     console.log(buffer, blob);
//     const file = new File(buffer, 'music.mp3', {
//       type: blob.type,
//       lastModified: Date.now()
//     });
//     const li = document.createElement('li');
//     const player = new Audio(URL.createObjectURL(file));
//     player.controls = true;
//     li.appendChild(player);
//     document.querySelector('#playerlist').appendChild(li);
//   })
//     .catch(e => {
//       console.error(e);
//     });
//   recognition.stop();
//   instructions.textContent = 'Voice Recognition is Off';
// });

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
const settingsView = document.querySelector('.settings-page-view');
const settingIcon = document.querySelector('.settings');
recordAudioFileImg.addEventListener('click', changeView);
textToSpeechImg.addEventListener('click', changeView);
settingIcon.addEventListener('click', changeView);
function changeView(event) {
  if (event.target.matches('#record-audio-file')) {
    homepage.classList = 'homepage hidden';
    recordAudioView.classList = 'record-audio-view';
  }
  if (event.target.matches('#text-to-speech')) {
    homepage.classList = 'homepage hidden';
    textToSpeechView.classList = 'text-to-speech-view';
  }

  if (event.target.matches('.settings')) {
    homepage.classList = 'homepage hidden';
    settingsView.classList = 'settings-page-view';
  }
}
const logoImageTwo = document.querySelector('.logo-image-two');
const logoImageThree = document.querySelector('.logo-image-three');
const logoImageFour = document.querySelector('.logo-image-four');
logoImageFour.addEventListener('click', goToHomepage);
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
  if (event.target.matches('.logo-image-four')) {
    homepage.classList = 'homepage';
    settingsView.classList = 'settings-page-view hidden';
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
