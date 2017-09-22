import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteThumbnailComponent } from './quote-thumbnail.component';

describe('QuoteThumbnailComponent', () => {
  let component: QuoteThumbnailComponent;
  let fixture: ComponentFixture<QuoteThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
