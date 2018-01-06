import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import * as RecordRTC from 'recordrtc';

// followed tutorial on medium and blog
// https://medium.com/@SumanthShankar/integrate-recordrtc-with-angular-2-typescript-942c9c4ca93f
// https://blog.sambego.be/creating-an-audio-waveform-from-your-microphone-input/

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements AfterViewInit {
  @ViewChild('video') video: ElementRef;
  @Output() inputFilled: EventEmitter<boolean> = new EventEmitter<boolean>();

  recordRTC;
  stream;

  constructor() { }

  ngAfterViewInit() {
      // set the initial state of the video
      const video: HTMLVideoElement = this.video.nativeElement;
      video.muted = false;
      video.controls = true;
      video.autoplay = false;
  }

  startRecording() {
    const mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia({audio: true, video: false}) // should be mediaConstraints
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  successCallback(stream: MediaStream) {
    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    console.log('error');
  }
  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }
  stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.inputFilled.emit(true);
  }
  processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }
  download() {
    this.recordRTC.save('video.webm');
  }
}
