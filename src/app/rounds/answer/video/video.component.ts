import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video') video: ElementRef;
  recorder;
  src;
  constructor(private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {

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
}
