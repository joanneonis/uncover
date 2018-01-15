import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../../services/answer.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-answers-others',
  templateUrl: './answers-others.component.html',
  styleUrls: ['./answers-others.component.css']
})
export class AnswersOthersComponent implements OnInit {
@ViewChild('audio') audioPlayer: ElementRef;
selectedArtwork: any;
question: any;
answers: any[];
currentSound;
currentPlay;
currentPause;
modalOpen;
round;

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private db: AngularFirestore,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // Get and set round
    this.round = this.categoryService.activeCategory;

    // Open info modal if its the first round
    if (this.round === 1) {
      this.modalOpen = true;
    }

    // Subscribe to artworks
    this.route.data.subscribe(a => {
        this.selectedArtwork = a['artwork'];
        this.answers = a['answers'];
        this.question = {
          id: a['question'].payload.id,
          data: a['question'].payload.data(),
          ref: a['question'].payload.ref
        };
    });
  }
}
