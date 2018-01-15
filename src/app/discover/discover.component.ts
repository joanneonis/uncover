import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OwlCarousel } from 'ng2-owl-carousel';

import { ArtworkService } from '../services/artwork.service';
import { firestore } from 'firebase/app';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  activeItem = 0;
  artworks: any[];
  activeId = '1PeUQ9NwpX44ZLZ6bo0T';
  content;
  test;
  questions;
  allQuestions: any[] = [];
  activeCat = '1';
  questionsRef;
  updateCat;
  OwlOptions = {
    items: 2,
    dots: false,
    navigation: false,
    onDragged: this.slided.bind(this)
  };

  constructor(private artworkService: ArtworkService) { }

  ngOnInit() {

    this.artworkService.getArtworks().subscribe(a => {
      this.artworks = a.map(b => ({  id: b.payload.doc.id, data: b.payload.doc.data() }));
      this.owlElement.refresh();
      this.activeId = this.artworks[0].id;
    });

    // this.content = this.artworkService.getById(this.activeId);
    // // this.content.snapshotChanges().subscribe(b => b.map(d => ({id: b.payload.doc.id, data: b.payload.doc.data()})));
    // this.content.snapshotChanges().subscribe(b => this.test = {id: b.payload.id, data: b.payload.data()});

    // this.content = this.artworkService.getById(this.activeId);
    // this.questions = this.content.collection('Questions').snapshotChanges();

    // this.questions.subscribe(data => console.log(data));
    // data.map({id: data.payload.doc.id, data: data.payload.doc.data()})

    this.update(this.activeId);

  }
  slided(event) {
    this.activeItem = event.item.index;
    this.activeId = this.artworks[this.activeItem].id;

    this.update(this.activeId);
  }

  update(id) {
    this.content = this.artworkService.getById(id);
    this.questionsRef = this.content.collection('Questions');

    this.questions = [];

    this.questionsRef.snapshotChanges().subscribe(data => {
      this.allQuestions = data.map(d => ({  id: d.payload.doc.id, data: d.payload.doc.data() }));
      this.activeCat = this.allQuestions.filter(a => a.data.LiteratureText)[0].data.CategorieId;
      this.questions = this.allQuestions.filter(b => b.data.CategorieId === this.activeCat);
    });
  }

  newcat() {
    this.activeCat = this.updateCat;
    this.questions = this.allQuestions.filter(b => b.data.CategorieId === this.activeCat);
  }

  hasAny(e): boolean {
    const any = this.allQuestions.findIndex(a => a.data.CategorieId === `${e}` && a.data.LiteratureText) >= 0;
    return any;
  }
}
