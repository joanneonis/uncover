import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  selectedArtwork: any;
  questions: any[];
  activeCategory = 0;
  answerTxt = '';
  inputFilled = false;
  modalDrawOpen = false;
  modalSoundOpen = false;
  modalImageOpen = false;
  modalTextOpen = false;

  // Active question return when filled
  get activeQuestion(): any {
    if (this.activeCategory === 0 || !this.questions) {
      return null;
    }
    const rtrn = this.questions.filter(a => a.data.CategorieId === this.activeCategory)[0];
    return rtrn;
  }

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // Subscribe to data
    this.route.data.subscribe(a => {
      this.selectedArtwork = a['artwork'];
      this.questions = a['questions'].map(b => ({ id: b.payload.doc.id, data: b.payload.doc.data() }));

      this.categoryService.$activeCategory.subscribe(b => {
        this.activeCategory = this.categoryService.activeCategory;
        if (this.activeCategory === 1) {
          this.modalDrawOpen = true;
        }
      });
    });
  }

  // Handle if user input is empty or not
  handleInputFilled(e: boolean) {
    this.inputFilled = true;
  }

  handleInputEmpty(e: boolean) {
    this.inputFilled = false;
  }

}
