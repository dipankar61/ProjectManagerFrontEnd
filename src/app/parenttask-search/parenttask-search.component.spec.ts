import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenttaskSearchComponent } from './parenttask-search.component';

describe('ParenttaskSearchComponent', () => {
  let component: ParenttaskSearchComponent;
  let fixture: ComponentFixture<ParenttaskSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenttaskSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenttaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
