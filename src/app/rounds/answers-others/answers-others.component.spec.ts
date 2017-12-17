import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersOthersComponent } from './answers-others.component';

describe('AnswersOthersComponent', () => {
  let component: AnswersOthersComponent;
  let fixture: ComponentFixture<AnswersOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
