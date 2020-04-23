import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatePostComponent } from './account-create-post.component';

describe('AccountCreatePostComponent', () => {
  let component: AccountCreatePostComponent;
  let fixture: ComponentFixture<AccountCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCreatePostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
