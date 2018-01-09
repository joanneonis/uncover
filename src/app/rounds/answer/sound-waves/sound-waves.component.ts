import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter  } from '@angular/core';
import { createText } from '@angular/core/src/view/text';
declare var MediaRecorder: any;

@Component({
  selector: 'app-sound-waves',
  templateUrl: './sound-waves.component.html',
  styleUrls: ['./sound-waves.component.css']
})
export class SoundWavesComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('audio') audioPlayerRef: ElementRef;
  @ViewChild('downloadButton') downloadButton: ElementRef;
  @Output() inputFilled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() inputEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();

  audioContext: AudioContext;
  audioPlayer: HTMLAudioElement;
  analyser: any;
  scriptProcessor: any;
  chunks = [];

  barWidth = 10;
  barGutter = 4;
  barColor = '#ffffff';
  state = 'idle';
  recordedAudio;

  // Variables
  stream = null;
  input = null;
  recorder = null;
  recording = null;
  isRecording = false;
  isPlaying = false;

  canvasContext: any;
     bars = [];
     width = 0;
     height = 0;
     halfHeight = 0;
     drawing = false;

  constructor() { }

  ngAfterViewInit() {
    this.audioPlayer = this.audioPlayerRef.nativeElement;
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.chunks = [];

    const messageContainer = document.querySelector('.js-message');
    const recordButton = document.querySelector('.js-record');
    const playButton = document.querySelector('.js-play');
    const audioPlayer = document.querySelector('.js-audio');
    const playButtonIcon = document.querySelector('.js-play .fa');

    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 1024;

    // Start the application
    this.requestMicrophoneAccess();
    this.setupPlayer();

    // Add event listeners to the buttons
    // recordButton.addEventListener('mouseup', this.toggleRecording);
    // playButton.addEventListener('mouseup', this.togglePlay);
  }

  requestMicrophoneAccess() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        this.setAudioStream(stream);
      }, error => {
        console.log('It doest work');
      });
    } else {
      console.log('It works');
    }
  }
  setAudioStream(stream) {
    stream = stream;
    this.input = this.audioContext.createMediaStreamSource(stream);
    this.recorder = new MediaRecorder(stream);

    this.setRecorderActions();
    this.setupWaveform();
  }

  // Setup the recorder actions
   setRecorderActions() {
     const that = this;
    this.recorder.ondataavailable = e => { that.saveChunkToRecording(e, that); };
    this.recorder.onstop = e => { that.saveRecording(that); };
  }

  // Save chunks of the incomming audio to the chuncks array
 saveChunkToRecording(event, ctx) {
    ctx.chunks.push(event.data);
  }

    // Save the recording
  saveRecording(ctx) {
    ctx.recording = URL.createObjectURL(new Blob(ctx.chunks, { 'type' : 'audio/ogg; codecs=opus' }));
    ctx.chunks = [];

    ctx.audioPlayer.setAttribute('src', ctx.recording);
    // this.playButton.classList.remove('button--disabled');
    this.recordedAudio = ctx.recording;
    this.downloadButton.nativeElement.setAttribute('href', ctx.recording);
  }

  // Start recording
  startRecording() {
    this.isRecording = true;
    // recordButton.classList.add('button--active');

    this.recorder.start();
    this.state = 'recording';
  }

  // Stop recording
  stopRecording() {
    this.isRecording = false;
    this.state = 'done';
    // recordButton.classList.remove('button--active');

    this.recorder.stop();
    this.inputFilled.emit(true);
  }

  // Toggle the recording button
  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  // Setup the canvas to draw the waveform
  setupWaveform() {
    const that = this;
    this.canvasContext = this.canvas.nativeElement.getContext('2d');

    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetHeight;
    this.halfHeight = this.canvas.nativeElement.offsetHeight / 2;

    this.canvasContext.canvas.width = this.width;
    this.canvasContext.canvas.height = this.height;

    this.input.connect(this.analyser);
    this.analyser.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.audioContext.destination);
    this.scriptProcessor.onaudioprocess = e => {this.processInput(e, that); };
  }

  // Process the microphone input
  processInput(audioProcessingEvent, ctx) {
    if (ctx.isRecording) {
      console.log('Render bars');
      const array = new Uint8Array(ctx.analyser.frequencyBinCount);

      ctx.analyser.getByteFrequencyData(array);
      ctx.bars.push(ctx.getAverageVolume(array));

      if (ctx.bars.length <= Math.floor(ctx.width / (ctx.barWidth + ctx.barGutter))) {
          ctx.renderBars(ctx.bars);
      } else {
          ctx.renderBars(ctx.bars.slice(ctx.bars.length - Math.floor(ctx.width / (ctx.barWidth + ctx.barGutter)), ctx.bars.length));
      }

    } else {
      ctx.bars = [];
    }
  }

  // Calculate the average volume
  getAverageVolume(array) {
    const length = array.length;

    let values = 0;
    let i = 0;

    for (; i < length; i++) {
        values += array[i];
    }

    return values / length;
  }

  // Render the bars
  renderBars(bars) {
    if (!this.drawing) {
      this.drawing = true;

      window.requestAnimationFrame(() => {
        this.canvasContext.clearRect(0, 0, this.width, this.height);

        bars.forEach((bar, index) => {
          this.canvasContext.fillStyle = this.barColor;
          // tslint:disable-next-line:max-line-length
          this.canvasContext.fillRect((index * (this.barWidth + this.barGutter)), this.halfHeight, this.barWidth, (this.halfHeight * (bar / 100)));
          // tslint:disable-next-line:max-line-length
          this.canvasContext.fillRect((index * (this.barWidth + this.barGutter)), (this.halfHeight - (this.halfHeight * (bar / 100))), this.barWidth, (this.halfHeight * (bar / 100)));
        });

        this.drawing = false;
      });
    }
  }

  // Play the recording
  play() {
    this.isPlaying = true;
    this.state = 'playing';

    this.audioPlayer.play();

    // this.playButton.classList.add('button--active');
    // this.playButtonIcon.classList.add('fa-pause');
    // this.playButtonIcon.classList.remove('fa-play');
  }

  // Stop the recording
  stop() {
    this.state = 'done';
    this.isPlaying = false;

    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;

    // playButton.classList.remove('button--active');
    // playButtonIcon.classList.add('fa-play');
    // playButtonIcon.classList.remove('fa-pause');
  }

  // Toggle the play button
  togglePlay() {
    if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
  }

  // Setup the audio player
  setupPlayer() {
    this.audioPlayer.addEventListener('ended', () => {
      this.stop();
    });
  }
}
