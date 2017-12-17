import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ArtworkService } from '../../../services/artwork.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  categories: Observable<any>;
  selectedArtwork: any;

    constructor(private categoryService: CategoryService,
                private artworkService: ArtworkService,
                private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params.subscribe( a => {
        this.selectedArtwork = this.artworkService.getById(a['artworkId']);
      });

      this.categories = this.categoryService.getCategories();
    }
}
