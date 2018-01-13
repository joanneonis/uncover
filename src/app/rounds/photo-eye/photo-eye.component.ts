import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-eye',
  templateUrl: './photo-eye.component.html',
  styleUrls: ['./photo-eye.component.css']
})
export class PhotoEyeComponent implements OnInit {
  inputFilled = false;

  constructor() { }

  ngOnInit() {
  }
  handleInputFilled(e: boolean) {
    this.inputFilled = true;
  }

  handleInputEmpty(e: boolean) {
    this.inputFilled = false;
  }
}
