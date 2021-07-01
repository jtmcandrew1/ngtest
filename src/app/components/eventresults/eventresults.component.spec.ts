import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventresultsComponent } from './eventresults.component';

describe('EventresultsComponent', () => {
  let component: EventresultsComponent;
  let fixture: ComponentFixture<EventresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
