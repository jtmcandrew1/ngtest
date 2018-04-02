import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondetailComponent } from './divisiondetail.component';

describe('DivisiondetailComponent', () => {
  let component: DivisiondetailComponent;
  let fixture: ComponentFixture<DivisiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
