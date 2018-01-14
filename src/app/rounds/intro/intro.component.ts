import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import ColorThief from 'color-thief-standalone';
import * as $ from 'jquery';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements AfterViewInit {
@ViewChild('canvas') canvas: ElementRef;
  modalScratchOpen = false;
  modalScanOpen = false;
  modalRoundOpen = false;
  categories: Observable<any>;
  activeCategory: any = this.categoryService.$activeCategory;
  selectedArtwork: any;
  artworks: any[];
  showCategory;
  colorThief = new ColorThief();
  isDrawing;
  lastPoint;
  container    = document.getElementById('container');
  round = 0;
  canvasWidth  = window.innerWidth;
  canvasHeight = window.innerHeight;
  ctx;
  image        = new Image();
  brush        = new Image();
  backImage;
  activeItem;
  obj = [{
      name: 'Lijst met appels',
      xStart: 120,
      yStart: 470,
      xEnd: 170,
      yEnd: 120,
      pixels: {
        data: [],
      },
      pdata: [],
      l: 0,
      total: 0,
      count: 0,
      setfilledInPixels: 0,
      done: false,
    },
  {
    name: 'In oranje bol',
    xStart: 40,
    yStart: 130,
    xEnd: 180,
    yEnd: 150,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'Oester met parels',
    xStart: 0,
    yStart: 210,
    xEnd: 220,
    yEnd: 170,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'symboliek hel',
    xStart: 0,
    yStart: 470,
    xEnd: 410,
    yEnd: 260,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'Kont met bloem',
    xStart: 0,
    yStart: 380,
    xEnd: 220,
    yEnd: 90,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'Heks met uil',
    xStart: 0,
    yStart: 0,
    xEnd: 415,
    yEnd: 170,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'Ei en schelp',
    xStart: 220,
    yStart: 330,
    xEnd: 220,
    yEnd: 140,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
  {
    name: 'Glazen bol bouwwerk',
    xStart: 210,
    yStart: 180,
    xEnd: 415,
    yEnd: 150,
    pixels: {
      data: [],
    },
    pdata: [],
    l: 0,
    total: 0,
    count: 0,
    setfilledInPixels: 0,
    done: false,
  },
];


  //  activeCategory = localStorage.getItem('activeCategory');

  constructor(private categoryService: CategoryService,
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router) {
    }

    ngAfterViewInit() {
  //  console.log(this.canvas);
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.route.data.subscribe(a => {
      if (a['artwork']) {
        this.selectedArtwork = a['artwork'];
      }
    });

    this.categoryService.getCategories().subscribe(a => {
      this.categories = a;
    });

    // this.categoryService.$activeCategory.subscribe(a => {
    //   // this.activeCategory = a;
    //   this.round = this.activeCategory;
    // });
    this.artworkService.getArtworks().subscribe(a => {
      this.artworks = a.map(b => ({ id: b.payload.doc.id, data: b.payload.doc.data() }));
    });

    this.round = this.categoryService.activeCategory;
    // this.round = this.activeCategory;
    console.log(this.round);

    if (this.round === 0) {
      console.log('im open');
      this.modalScratchOpen = true;
    }

switch (this.round) {
  case 0:
      this.image.src = '/assets/img/parts/resized/Lijst-met-appels.png';
      this.backImage = '/assets/img/parts/back/Lijst-met-appels.png';
      this.activeItem = this.obj[0];
      break;
  case 1:
      this.image.src = '/assets/img/parts/resized/In-oranje-bol.png';
      this.backImage = '/assets/img/parts/back/In-oranje-bol.png';
      this.activeItem = this.obj[1];
      break;
  case 2:
      this.image.src = '/assets/img/parts/resized/Oester-met-parels.png';
      this.backImage = '/assets/img/parts/back/Oester-met-parels.png';
      this.activeItem = this.obj[2];
      break;
  case 3:
      this.image.src = '/assets/img/parts/resized/symboliek-hel.png';
      this.backImage = '/assets/img/parts/back/symboliek-hel.png';
      this.activeItem = this.obj[3];
      break;
  case 4:
      this.image.src = '/assets/img/parts/resized/Kont-met-bloem.png';
      this.backImage = '/assets/img/parts/back/Kont-met-bloem.png';
      this.activeItem = this.obj[4];
      break;
  case 5:
      this.image.src = '/assets/img/parts/resized/Heks-met-uil.png';
      this.backImage = '/assets/img/parts/back/Heks-met-uil.png';
      this.activeItem = this.obj[5];
      break;
  case 6:
      this.image.src = '/assets/img/parts/resized/Ei-en-schelp.png';
      this.backImage = '/assets/img/parts/back/Ei-en-schelp.png';
      this.activeItem = this.obj[6];
      break;
  case 7:
      this.image.src = '/assets/img/parts/resized/Glazen-bol-bouwwerk.png';
      this.backImage = '/assets/img/parts/back/Glazen-bol-bouwwerk.png';
      this.activeItem = this.obj[7];
}



 // nu komt het, het scratchen

  // tslint:disable-next-line:max-line-length
  this.brush.src = '/assets/img/brush.png';

  // this.canvas.nativeElement.addEventListener('touchstart', this.handleMouseDown, false);
  // this.canvas.nativeElement.addEventListener('mousemove', this.handleMouseMove, false);
  // this.canvas.nativeElement.addEventListener('touchmove', this.handleMouseMove, false);
  // this.canvas.nativeElement.addEventListener('mouseup', this.handleMouseUp, false);
  // this.canvas.nativeElement.addEventListener('touchend', this.handleMouseUp, false);

// 7



// testdrawings
  const that = this;
// front image
const centerWidth = that.canvasWidth / 2 - 632 / 2;
const centerHeight = that.canvasHeight / 2 - 849 / 2;
 this.image.onload = function() {
    that.ctx.drawImage(that.image, centerWidth, centerHeight);
  };

  for (let index = 0; index < this.obj.length; index++) {
    const element = this.obj[index];

    this.ctx.fillStyle = 'blue';

    this.ctx.rect(element.xStart, element.yStart, element.xEnd, element.yEnd);
    this.ctx.stroke();
  }
  }

  angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }

   // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  getFilledInPixels(stride) {

    if (!stride || stride < 1) { stride = 1; }

    let pixels   = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight),
    pdata    = pixels.data,
    l        = pdata.length,
    total    = (l / stride),
    count    = 0;

    // Iterate over all pixels
    for (let i = count = 0; i < l; i += stride) {
      // tslint:disable-next-line:radix
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);

 //   return ;
  }

  getMouse(e, canvas) {
    let offsetX = 0, offsetY = 0, mx = 0, my = 0;

    if (this.canvas.nativeElement.offsetParent !== undefined) {
      // do {
      //   offsetX += this.canvas.nativeElement.offsetLeft;
      //   offsetY += this.canvas.nativeElement.offsetTop;
      // } while ((canvas = this.canvas.nativeElement.offsetParent));
    }

    if (e instanceof MouseEvent) {
      mx = (e.pageX) - offsetX;
      my = (e.pageY) - offsetY;
      } else if (e instanceof TouchEvent) {
        mx = (e.changedTouches[0].clientX) - offsetX;
        my = (e.changedTouches[0].clientY) - offsetY;
        }

    return {x: mx, y: my};
  }

   handlePercentage(filledInPixels) {

//    console.log(filledInPixels);

    if (filledInPixels > 60) {
      let revealedPaintings = JSON.parse(localStorage.getItem('revealedPaintings') || '[]');
      revealedPaintings = [...revealedPaintings, this.activeItem.name];
      localStorage.setItem('revealedPaintings', JSON.stringify(revealedPaintings));

      // set category/round
      this.categoryService.nextCategory();
      this.router.navigate([`intro/${this.artworks[this.obj.indexOf(this.activeItem)].id}`]);
    }
//     for (let index = 0; index < this.obj.length; index++) {
//       const element = this.obj[index];

//       // element.filledInPixels = element.filledInPixels || 0;
// //      console.log(element.name, "is zover:", element.setfilledInPixels + '%');

//       if (element.setfilledInPixels > 90 && element.done === false) {
//         // console.log(element.name, `intro/${this.artworks[this.obj.indexOf(element)].id}`);
//         element.done = true;

//         let revealedPaintings = JSON.parse(localStorage.getItem('revealedPaintings') || '[]');
//         revealedPaintings = [...revealedPaintings, element.name];
//         localStorage.setItem('revealedPaintings', JSON.stringify(revealedPaintings));

//         // set category/round
//         this.categoryService.nextCategory();
//         this.router.navigate([`intro/${this.artworks[this.obj.indexOf(element)].id}`]);
//       }
//     }
  }

  handleMouseDown(e) {
    // console.log(e);
    this.isDrawing = true;
    this.lastPoint = this.getMouse(e, this.canvas);
  }

  handleMouseMove(e) {
    // console.log(e.changedTouches[0].pageX);
    // console.log('helleuw');
    if (!this.isDrawing) { return; }

    e.preventDefault();

    const currentPoint = this.getMouse(e, this.canvas),
        dist = this.distanceBetween(this.lastPoint, currentPoint),
        angle = this.angleBetween(this.lastPoint, currentPoint);

    let x = 0, y = 0;

    for (let i = 0; i < dist; i++) {
      x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
      y = this.lastPoint.y + (Math.cos(angle) * i) - 25;
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.drawImage(this.brush, x, y);
    }

    this.lastPoint = currentPoint;
    this.handlePercentage(this.getFilledInPixels(32));
  }

  handleTouchMove(e) {
  //  console.log('scalefactor', ((window.innerWidth - 412) / 412) + 1);
   // if (!this.isDrawing) { return; }

    e.preventDefault();

    this.lastPoint = this.getMouse(e, this.canvas);

    let offsetX = 0, offsetY = 0, mx = 0, my = 0;
    mx = (e.changedTouches[0].clientX) - offsetX;
    my = (e.changedTouches[0].clientY) - offsetY;

    // const currentPoint = this.getMouse(e, this.canvas),
    //     dist = this.distanceBetween(this.lastPoint, currentPoint),
    //     angle = this.angleBetween(this.lastPoint, currentPoint);

    const currentPoint = {x: mx, y: my},
      dist = this.distanceBetween(this.lastPoint, currentPoint),
      angle = this.angleBetween(this.lastPoint, currentPoint);

    let x = 0, y = 0;

    // console.log(e.changedTouches);

// for (let i = 0; i < dist; i++) {

    for (let i = 0; i < 50; i++) {
      x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
      y = this.lastPoint.y + (Math.cos(angle) * i) - 25;
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.drawImage(this.brush, x, y);
    }

    this.lastPoint = currentPoint;
    this.handlePercentage(this.getFilledInPixels(32));
  }

  distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  handleMouseUp(e) {
    this.isDrawing = false;
  }

  randomArtwork() {
    // console.log(this.artworks);
    const randomArtwork = this.artworks[Math.floor(Math.random() * this.artworks.length)];

    // // set category/round
    this.categoryService.nextCategory();

    this.router.navigate([`intro/${randomArtwork.id}`]);
  }

}
