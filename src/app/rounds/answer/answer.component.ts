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
  answer = '';
  drawing = false;

  get activeQuestion(): any {
    if (this.activeCategory === 0 || !this.questions) {
      return null;
    }

    return this.questions.filter(a => a.data.CategorieId == (+localStorage.getItem('activeCategory')))[0];

  }

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(a => {
      console.log(a);
        this.selectedArtwork = a['artwork'];
        this.questions = a['questions'].map(b => ({ id: b.payload.doc.id, data: b.payload.doc.data() }));

        this.categoryService.$activeCategory.subscribe(b => {
          this.activeCategory = b;
        });
    });
  }

  handleInputFilled(e: boolean) {
    this.drawing = true;
  }

  handleInputEmpty(e: boolean) {
    this.drawing = false;
  }
}
