import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlesCompletedComponent } from './battles-completed.component';

describe('BattlesCompletedComponent', () => {
  let component: BattlesCompletedComponent;
  let fixture: ComponentFixture<BattlesCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlesCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlesCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
