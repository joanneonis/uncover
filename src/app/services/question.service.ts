import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/first';
@Injectable()
export class QuestionService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const artworkId = route.params['artworkId'];
    const questionId = route.params['questionId'];

    if (questionId) {
      return new Promise((r, reject) => {
        this.getById(artworkId, questionId).first().subscribe((a) => {r(a); }, reject);
      });
    }

    const artwork = this.getQuestions(artworkId);



    return new Promise((r, reject) => {
      artwork.first().subscribe((a) => {r(a); }, reject);
    });
  }

  constructor(private db: AngularFirestore) {}

  getQuestions(artworkId: string) {
    return this.db.collection(`artworks/${artworkId}/Questions`).snapshotChanges();
  }

  getById (artworkId: string, id: string) {
    return this.db.doc(`/artworks/${artworkId}/Questions/${id}`).snapshotChanges();
  }
}
