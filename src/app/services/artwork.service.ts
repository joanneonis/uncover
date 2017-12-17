import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArtworkService {

  constructor(private db: AngularFirestore) {}

  getArtworks() {
    return this.db.collection('artworks').snapshotChanges();
  }

  getById (id: string) {
    return this.db.doc(`/artworks/${id}`).valueChanges();
  }
}
