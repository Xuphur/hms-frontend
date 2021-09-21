import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListassetComponent } from './listasset.component';

describe('ListassetComponent', () => {
  let component: ListassetComponent;
  let fixture: ComponentFixture<ListassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
