import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battles-completed',
  templateUrl: './battles-completed.component.html',
  styleUrls: ['./battles-completed.component.css']
})
export class BattlesCompletedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Go to next page after 2 secs
    setTimeout( function(){
      this.router.navigate([`/discover`]);
    }, 2000);
  }
}
