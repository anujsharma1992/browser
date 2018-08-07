import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportReplyComponent } from './support-reply.component';

describe('SupportReplyComponent', () => {
  let component: SupportReplyComponent;
  let fixture: ComponentFixture<SupportReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
