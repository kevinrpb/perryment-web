import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTournamentsComponent } from './detail-tournaments.component';

describe('DetailTournamentsComponent', () => {
  let component: DetailTournamentsComponent;
  let fixture: ComponentFixture<DetailTournamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTournamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
