import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css']
})
export class LiteratureComponent implements OnInit {
selectedArtwork: any;
question: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(a => {
      console.log(a);
        this.selectedArtwork = a['artwork'];
        this.question = {
          id: a['question'].payload.id,
          data: a['question'].payload.data()
        };
    });
  }

}
