import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/first';
@Injectable()
export class AnswerService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const artworkId = route.params['artworkId'];
    const questionId = route.params['questionId'];

    const artwork = this.getAnswers(artworkId, questionId);

    return new Promise((r, reject) => {
      artwork.first().subscribe((a) => { r(a); }, reject);
    });
  }

  constructor(private db: AngularFirestore) {}

  getAnswers(artworkId: string, questionId: string) {
    return this.db.collection(`artworks/${artworkId}/Questions/${questionId}/Answers`).valueChanges();
  }
}
