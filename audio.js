//playing audio
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// get the audio element
const audioElement = document.getElementById('audio');
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);


// select our play button
const audioButton = document.querySelector('button');

audioButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
          

    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);

audioElement.addEventListener('ended', () => {
    audioButton.dataset.playing = 'false';
}, false);

const volumeNode = audioContext.createGain();

track.connect(volumeNode).connect(audioContext.destination);

const volumeController = document.querySelector('[data-action = "volume"]');

volumeController.addEventListener('input', function() {
    volumeNode.gain.value = this.value;
}, false);