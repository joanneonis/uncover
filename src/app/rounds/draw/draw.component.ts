import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.addEventListener('touchstart', function (e) {
      console.log('start');
    }, false);

    document.body.addEventListener('touchend', function (e) {
      console.log('end');
        e.preventDefault();
    }, false);
    document.body.addEventListener('touchmove', function (e) {
      console.log('move');
        e.preventDefault();
    }, false);
  }
}
