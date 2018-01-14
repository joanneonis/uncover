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
    this.round = this.categoryService.activeCategory;

    if (this.round === 1) {
      this.modalOpen = true;
    }

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
    // if (this.currentSound) {
    //   console.log(this.currentSound);
    //   this.currentSound.onended = function() {
    //     console.log('readey');
    //     this.currentPlay.classList.add('visible');
    //     this.currentPause.classList.remove('visible');
    //   };
    // }
  }
  // playThis(e) {
  //   this.currentPlay = e.target.childNodes[1];
  //   this.currentPause = e.target.childNodes[4];
  //   this.currentSound = e.target.nextSibling;

  //   if (this.currentSound.paused) {
  //     this.currentSound.play();
  //     this.currentPause.classList.add('visible');
  //     this.currentPlay.classList.remove('visible');
  //   }else {
  //     this.currentSound.pause();
  //     this.currentPlay.classList.add('visible');
  //     this.currentPause.classList.remove('visible');
  //   }
  // }
}
