import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Output() inputFilled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() inputEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();



  // base code from https://codepen.io/luisgra/pen/ypJXPd, but turned it into angular and made some changes
  ctx;
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  hue = '#c00';
  lineWidth = 1;
  blob;
  img;
  canvasTop;
  colorPaletteOpen = false;
  pencilSizeOpen = false;

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  pen = {
    canvasID: 'canvas',
    width: 900,
    height: 450
  };

  brushSizes = [5, 10, 20, 30];
  selectedLine = 0;

  colors = ['#64592E', '#24612D', '#15667C', '#B6B4D7', '#B76F72', '#BB1821'];

  constructor(
    // private af: AngularFireDatabase,
    // private fb: FirebaseApp
  ) { }

  ngAfterViewInit() {
    const that = this;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    this.baseImage();

    document.body.addEventListener('touchstart', function (e) {
      if (e.target === that.canvas.nativeElement) {
        [that.lastX, that.lastY] = [e.changedTouches[0].clientX, (e.changedTouches[0].clientY - that.canvasTop)];
        that.isDrawing = true;
      }
    }, false);

    document.body.addEventListener('touchend', function (e) {
      if (e.target === that.canvas.nativeElement) {
        that.isDrawing = false;
      }
    }, false);
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
      if (e.target === that.canvas.nativeElement) {
        that.canvasTop = (<HTMLCanvasElement>e.target).offsetTop;
        that.touchDraw(e);
      }
    }, false);
  }

  baseImage() {
    const that = this;

    // https://www.html5canvastutorials.com/tutorials/html5-canvas-image-size/ uitbreiden met grootte

    //683 height
    // const width = (((683 - window.innerHeight) / window.innerHeight));
    // const widthcalc = width * 632;
    const ratio = (632 / 683);
    const height = window.innerHeight; //window.innerHeight
    const width = height * ratio;
    const centerWidth = that.canvasWidth / 2 - width / 2;
    const centerHeight = that.canvasHeight / 2 - height / 2;

    console.log(ratio, width, height);

    const base_image = new Image();
    base_image.src = 'assets/img/draw-resized.png';
    base_image.onload = function(){
      that.ctx.drawImage(base_image, centerWidth, 0, width, height);
    };
  }

  draw(e) {
    this.ctx.globalCompositeOperation = 'destination-over';
    if (!this.isDrawing) {return; }

    this.inputFilled.emit(true);

    this.ctx.strokeStyle = this.hue;
    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();

    // Start from:
    this.ctx.moveTo(this.lastX, this.lastY);
    // Go to:
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();

    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  touchDraw(e) {
    this.ctx.globalCompositeOperation = 'destination-over';
    if (!this.isDrawing) {return; }

    this.inputFilled.emit(true);

    this.ctx.strokeStyle = this.hue;
    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();

    // Start from:
    this.ctx.moveTo(this.lastX, this.lastY);
    // Go to:
    this.ctx.lineTo(e.changedTouches[0].clientX, (e.changedTouches[0].clientY - this.canvasTop));
    this.ctx.stroke();

    [this.lastX, this.lastY] = [e.changedTouches[0].clientX, (e.changedTouches[0].clientY - this.canvasTop)];
  }

  handleMouseDown(e) {
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    this.isDrawing = true;
  }
  handleMouseUp(e) {
    this.isDrawing = false;
  }
  handleMouseOut(e) {
    this.isDrawing = false;
  }
  handleMouseMove(e) {
    this.draw(e);
  }

  setLineWidth() {
    console.log(this.selectedLine);
    console.log(this.brushSizes.length);
    this.lineWidth = this.brushSizes[this.selectedLine];

    if (this.selectedLine < this.brushSizes.length) {
      this.selectedLine += 1;
    }else {
      this.selectedLine = 0;
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 600);
    this.baseImage();
    this.inputEmpty.emit(false);
  }

  saveToFire() {
      this.img = this.canvas.nativeElement.toDataURL('image/png');
  }
}

