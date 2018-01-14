import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video') video: ElementRef;
  @Output() inputFilled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() inputEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();

  recorder;
  src;
  isRecording;

  constructor(private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {
    const that = this;
    this.video.nativeElement.addEventListener('ended', myHandler, false);
    function myHandler() {
      that.isRecording = 'recorded';
    }
  }

captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}
stopRecordingCallback(ctx) {
  this.isRecording = 'recorded';
  this.inputFilled.emit(true);
  //  this.video.nativeElement.src = this.video.nativeElement.srcObject = null;
//    this.video.nativeElement.src = URL.createObjectURL(this.recorder.getBlob());
    console.log(ctx);
    ctx.src = ctx.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(ctx.recorder.getBlob()));
    ctx.video.nativeElement.load();
//    ctx.video.nativeElement.play();
    ctx.recorder.camera.stop();
    ctx.recorder.destroy();
    ctx.recorder = null;
}
startRecording() {
  this.isRecording = 'recording';
  const that = this;
    this.captureCamera(function(camera) {
        that.src = that.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(camera));
        that.video.nativeElement.load();
//        that.video.nativeElement.play();
        that.recorder = RecordRTC(camera, {
            type: 'video'
        });
        that.recorder.startRecording();
        // release camera on stopRecording
        that.recorder.camera = camera;
    });
  }

  stopRecording() {
    const that = this;
      this.recorder.stopRecording( a => {that.stopRecordingCallback(that); });
    }

  load() {
    this.video.nativeElement.play();
  }
  play() {
    this.video.nativeElement.currentTime = 0;
    this.isRecording = 'playing';
    this.video.nativeElement.play();
  }
  trash() {
    this.isRecording = '';
    this.inputEmpty.emit(true);
    this.src = '';
    this.video.nativeElement.load();
  }
}
