/* global AgoraRTC */
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
const videoCallRoomView = document.querySelector('.video-call-room-view');
const videoCallRoomImg = document.querySelector('#video-call-room');
recordAudioFileImg.addEventListener('click', changeView);
textToSpeechImg.addEventListener('click', changeView);
videoCallRoomImg.addEventListener('click', changeView);
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
  if (event.target.matches('#video-call-room')) {
    homepage.classList = 'homepage hidden';
    videoCallRoomView.classList = 'video-call-room-view';
  }
}
const logoImageTwo = document.querySelector('.logo-image-two');
const logoImageThree = document.querySelector('.logo-image-three');
const logoImageFour = document.querySelector('.logo-image-four');
const logoImageFive = document.querySelector('.logo-image-five');
logoImageFive.addEventListener('click', goToHomepage);
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
  if (event.target.matches('.logo-image-five')) {
    homepage.classList = 'homepage';
    videoCallRoomView.classList = 'video-call-room-view hidden';
  }
}

AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.WARNING);
const handleError = function (err) {
  // eslint-disable-next-line no-console
  console.log('Error: ', err);
};

const remoteContainer = document.getElementById('remote-container');

function addVideoStream(elementId) {
  const streamDiv = document.createElement('div');
  streamDiv.id = elementId;
  streamDiv.style.transform = 'rotateY(180deg)';
  remoteContainer.appendChild(streamDiv);
}

function removeVideoStream(elementId) {
  const remoteDiv = document.getElementById(elementId);
  if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
}
const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8'
});

client.init('04f356ac2b1648c08891925f16a3f852', function () {

  // eslint-disable-next-line no-console
  console.log('client initialized');
}, function (err) {
  // eslint-disable-next-line no-console
  console.log('client init failed ', err);
});
const localStream = AgoraRTC.createStream({
  audio: true,
  video: true
});
localStream.init(() => {
  localStream.play('me');
  client.publish(localStream, handleError);
}, handleError);

client.join('00604f356ac2b1648c08891925f16a3f852IAB/T3dLrZVDcsLfv3IceMlEUOBqQ2eDrpW+PxWKHfXSK3y1AIgAAAAAEAATtvR9F40aYgEAAQAXjRpi', 'PaidTest1', null, uid => {
}, handleError);

client.on('stream-added', function (evt) {
  client.subscribe(evt.stream, handleError);
});

client.on('stream-subscribed', function (evt) {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  addVideoStream(streamId);
  stream.play(streamId);
});
client.on('stream-removed', function (evt) {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  stream.close();
  removeVideoStream(streamId);
});

client.on('peer-leave', function (evt) {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  stream.close();
  removeVideoStream(streamId);
});

const moonlitAsteroid = document.querySelector('.moonlit-asteroid');
const galaxySunset = document.querySelector('.love-tonight');
const darkOcean = document.querySelector('.dark-ocean');
const defaultBackground = document.querySelector('.default-background');
const colorPickerColorOne = document.querySelector('.color-picker-one');
const colorPickerColorTwo = document.querySelector('.color-picker-two');
const colorPickerColorThree = document.querySelector('.color-picker-three');
const colorPickerColorFour = document.querySelector('.color-picker-four');
const selectVoiceSpan = document.querySelector('.select-voice-span');
const videoCallRoomLabels = document.querySelector('.video-call-labels');
const videoCallRoomLabelsTwo = document.querySelector('.video-call-labels-two');

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
    videoCallRoomLabels.style.color = 'white';
    videoCallRoomLabelsTwo.style.color = 'white';
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
    videoCallRoomLabels.style.color = 'black';
    videoCallRoomLabelsTwo.style.color = 'black';
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
    videoCallRoomLabels.style.color = 'white';
    videoCallRoomLabelsTwo.style.color = 'white';
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
    videoCallRoomLabels.style.color = 'black';
    videoCallRoomLabelsTwo.style.color = 'black';
    document.body.style.animation = 'gradient 15s ease infinite';
  }
}

function getLocalStream() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    window.localStream = stream;
  }).catch(err => {
    console.error(err);
  });
}
getLocalStream();
