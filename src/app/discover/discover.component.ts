import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OwlCarousel } from 'ng2-owl-carousel';

import { ArtworkService } from '../services/artwork.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  activeItem = 0;
  artworks: any[];
  OwlOptions = {
    items: 2,
    dots: false,
    navigation: false,
    onDragged: this.slided.bind(this)
  };

  constructor(private artworkService: ArtworkService) { }

  ngOnInit() {

    this.artworkService.getArtworks().subscribe(a => {
     // this.artworks = a.map(b => ({ id: b.payload.doc.id, data: b.payload.doc.data() }));
      this.artworks = a.map(b => ({  data: b.payload.doc.data() }));
      this.owlElement.refresh();
    });

    // .on('changed.owl.carousel', function(event) {
    //   let currentItem = event.item.index;
    //   window.location.hash = currentItem + 1;
    // })
  }
  slided(event) {
    this.activeItem = event.item.index;
  }
}
