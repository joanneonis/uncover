import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {
  private _categories: any[];
  private $categories;
  activeCategory = 0;
  $activeCategory: BehaviorSubject<any> = new BehaviorSubject<any>({});

  // Subscribe to categories
  constructor(private db: AngularFirestore) {
    this.$categories = db.collection('categories').valueChanges();
    this.$categories.subscribe(a => {
      this._categories = a;
      this.$activeCategory.next(this._categories[(+this.activeCategory - 1)]);
      console.log('constructor categorie:', this.activeCategory);
    });
  }

  // Retrieve categories
  getCategories() {
    return this.$categories || this.db.collection('categories').valueChanges();
  }

  // Set next round in game
  nextCategory() {
    const nextCategory = (this.activeCategory) + 1;
    this.activeCategory = nextCategory;

    if (this._categories) {
      this.$activeCategory.next(this._categories[(+this.activeCategory - 1)]);
    }

    // For testing rounds
    // console.log('did next cat, now it is:', this.activeCategory);
  }
}
