import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFirestore) {}

  getCategories() {
    return this.db.collection('categories').valueChanges();
  }

}
