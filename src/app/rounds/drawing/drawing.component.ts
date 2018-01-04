import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  // base code from https://codepen.io/luisgra/pen/ypJXPd, but turned it into angular and made some changes
  ctx;
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  hue = '#c00';
  lineWidth = '1';
  blob;
  img;
  canvasTop;

  pen = {
    canvasID: 'canvas',
    width: 900,
    height: 450
  };

  colors = ['#64592E', '#24612D', '#15667C', '#B6B4D7', '#B76F72', '#BB1821'];

  constructor(
    // private af: AngularFireDatabase,
    // private fb: FirebaseApp
  ) { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    const that = this;
    document.body.addEventListener('touchstart', function (e) {
      console.log(e);
      [that.lastX, that.lastY] = [e.changedTouches[0].clientX, (e.changedTouches[0].clientY - that.canvasTop)];
      that.isDrawing = true;
    }, false);

    document.body.addEventListener('touchend', function (e) {
      that.isDrawing = false;
    }, false);
    document.body.addEventListener('touchmove', function (e) {
      that.canvasTop = (<HTMLCanvasElement>e.target).offsetTop;
      that.touchDraw(e);
    }, false);
  }

  draw(e) {
    if (!this.isDrawing) {return; }

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
    if (!this.isDrawing) {return; }

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

  setLineWidth(e: any) {
    console.log(e.target.value);
    this.lineWidth = e.target.value;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 600);
  }

  saveToFire() {
      this.img = this.canvas.nativeElement.toDataURL('image/png');
  }
}

