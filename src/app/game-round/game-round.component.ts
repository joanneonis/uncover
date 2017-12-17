import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-round',
  templateUrl: './game-round.component.html',
  styleUrls: ['./game-round.component.css']
})
export class GameRoundComponent implements OnInit {
  categories: Observable<any>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

}
