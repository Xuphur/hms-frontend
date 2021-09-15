import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrecieptComponent } from './listreciept.component';

describe('ListrecieptComponent', () => {
  let component: ListrecieptComponent;
  let fixture: ComponentFixture<ListrecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListrecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
