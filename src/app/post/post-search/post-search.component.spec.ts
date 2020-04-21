import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchComponent } from './posts-search.component';

describe('PostSearchComponent', () => {
  let component: PostSearchComponent;
  let fixture: ComponentFixture<PostSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
