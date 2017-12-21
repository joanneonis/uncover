import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareResultComponent } from './share-result.component';

describe('ShareResultComponent', () => {
  let component: ShareResultComponent;
  let fixture: ComponentFixture<ShareResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
