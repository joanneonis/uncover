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

  constructor(private db: AngularFirestore) {
    this.$categories = db.collection('categories').valueChanges();
    this.$categories.subscribe(a => {
      this._categories = a;
      this.$activeCategory.next(this._categories[(+this.activeCategory - 1)]);
      console.log('constructor categorie:', this.activeCategory);
    });
  }

  getCategories() {
    return this.$categories || this.db.collection('categories').valueChanges();
  }

  nextCategory() {
    const nextCategory = (this.activeCategory) + 1;
    this.activeCategory = nextCategory;

    if (this._categories) {
      this.$activeCategory.next(this._categories[(+this.activeCategory - 1)]);
    }

    console.log('did next cat, now it is:', this.activeCategory);
  }
}
