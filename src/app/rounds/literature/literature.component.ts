import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css']
})
export class LiteratureComponent implements OnInit {
selectedArtwork: any;
question: any;
round = 0;
modalOpen;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.round = this.categoryService.activeCategory;

    this.route.data.subscribe(a => {
      console.log(a);
        this.selectedArtwork = a['artwork'];
        this.question = {
          id: a['question'].payload.id,
          data: a['question'].payload.data()
        };

        if (!this.question.data.LiteratureText && this.round !== 8) {
          this.nextRound();
        }else if (!this.question.data.LiteratureText) {
          this.router.navigate([`/photo-eye`]);
        }
    });
  }
  nextRound() {
    // const nextCategory = (+localStorage.getItem('activeCategory') || 0) + 1;
    // localStorage.setItem('activeCategory', `${nextCategory}`);
    this.router.navigate([`/intro`]);
  }
}
