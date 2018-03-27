import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddropComponent } from './adddrop.component';

describe('AdddropComponent', () => {
  let component: AdddropComponent;
  let fixture: ComponentFixture<AdddropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
