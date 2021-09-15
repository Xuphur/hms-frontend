import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrecieptComponent } from './newreciept.component';

describe('NewrecieptComponent', () => {
  let component: NewrecieptComponent;
  let fixture: ComponentFixture<NewrecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
