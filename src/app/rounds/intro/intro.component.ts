import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  categories: Observable<any>;
  activeCategory: any = this.categoryService.$activeCategory;
  selectedArtwork: any;
  artworks: any[];

  //  activeCategory = localStorage.getItem('activeCategory');

  constructor(private categoryService: CategoryService,
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(a => {
      if (a['artworkId']) {
        this.selectedArtwork = this.artworkService.getById(a['artworkId']);
      }
    });

    this.categoryService.getCategories().subscribe(a => {
      this.categories = a;
    });
    this.artworkService.getArtworks().subscribe(a => {
      this.artworks = a.map(b => ({ id: b.payload.doc.id, data: b.payload.doc.data() }));
    });
  }

  randomArtwork() {
    const randomArtwork = this.artworks[Math.floor(Math.random() * this.artworks.length)];

    // // set category/round
    this.categoryService.nextCategory();

    this.router.navigate([`intro/${randomArtwork.id}`]);
  }
}
