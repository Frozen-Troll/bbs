import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullPostComponent } from './pull-post.component';

describe('PullPostComponent', () => {
  let component: PullPostComponent;
  let fixture: ComponentFixture<PullPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
