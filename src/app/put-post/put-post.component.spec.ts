import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutPostComponent } from './put-post.component';

describe('PutPostComponent', () => {
  let component: PutPostComponent;
  let fixture: ComponentFixture<PutPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
