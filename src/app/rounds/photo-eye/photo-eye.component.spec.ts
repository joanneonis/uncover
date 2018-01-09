import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEyeComponent } from './photo-eye.component';

describe('PhotoEyeComponent', () => {
  let component: PhotoEyeComponent;
  let fixture: ComponentFixture<PhotoEyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoEyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
