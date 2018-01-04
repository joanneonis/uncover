import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {
  @ViewChild('player') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
    const handleSuccess = function(stream) {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(1024, 1, 1);

      source.connect(processor);
      processor.connect(context.destination);

      processor.onaudioprocess = function(e) {
        // Do something with the data, i.e Convert this to WAV
        console.log(e.inputBuffer);
      };
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(handleSuccess);

  }

}
