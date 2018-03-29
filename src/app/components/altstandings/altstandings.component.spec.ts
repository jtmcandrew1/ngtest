import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltstandingsComponent } from './altstandings.component';

describe('AltstandingsComponent', () => {
  let component: AltstandingsComponent;
  let fixture: ComponentFixture<AltstandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltstandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltstandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
