import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../../services/answer.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-answers-others',
  templateUrl: './answers-others.component.html',
  styleUrls: ['./answers-others.component.css']
})
export class AnswersOthersComponent implements OnInit {
@ViewChild('audioPlayer') audioPlayer: ElementRef;
selectedArtwork: any;
question: any;
answers: any[];

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.data.subscribe(a => {
      console.log(a);
        this.selectedArtwork = a['artwork'];
        this.answers = a['answers'];
        this.question = {
          id: a['question'].payload.id,
          data: a['question'].payload.data(),
          ref: a['question'].payload.ref
        };
        // this.categoryService.$activeCategory.subscribe(b => {
        //   this.activeCategory = b;
        // });
    });
  }

}
