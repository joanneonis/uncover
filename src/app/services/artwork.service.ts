import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/first';
@Injectable()
export class ArtworkService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const artworkId = route.params['artworkId'];
    const artwork = this.getById(artworkId);

    return new Promise((r, reject) => {
      artwork.first().subscribe((a) => {r(a); }, reject);
    });
  }

  constructor(private db: AngularFirestore) {}

  getArtworks() {
    return this.db.collection('artworks').snapshotChanges();
  }

  getById (id: string) {
    return this.db.doc(`/artworks/${id}`).valueChanges();
  }
}
