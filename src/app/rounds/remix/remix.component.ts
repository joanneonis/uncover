import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remix',
  templateUrl: './remix.component.html',
  styleUrls: ['./remix.component.css']
})
export class RemixComponent implements OnInit {
  shareListOpen = false;
  modalOpen = true;

  constructor() { }

  ngOnInit() {
  }
  share() {
    let windowVar: any;

    windowVar = window.navigator;

    if (!('share' in navigator)) {
      alert('Web Share API not supported.');
      return;
    }

    windowVar.share({
        title: 'Tim walker Uncovered',
        text: 'Mijn museumtrip remixed',
        url: 'https://uncover-b9e48.firebaseapp.com/'
    })
      .then(() => console.log('Successful share'))
      .catch(error => this.shareListOpen = !this.shareListOpen);
    }
}
