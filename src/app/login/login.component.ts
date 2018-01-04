import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);

    localStorage.setItem('activeCategory', '0');
  }

}
