import { Component, OnInit, Inject, Injectable, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AudioContext } from 'angular-audio-context';

// https://ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api/

@Component({
  selector: 'app-sound-wave',
  templateUrl: './sound-wave.component.html',
  styleUrls: ['./sound-wave.component.css']
})
export class SoundWaveComponent implements AfterViewInit {

  constructor(
    private audioContext: AudioContext
  ) { }

  ngAfterViewInit() {
    this.audioContext = new AudioContext();
    const analyser = this.audioContext.createAnalyser();
   // const scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    const chunks = [];
    console.log(this.audioContext);
  }

}
