import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarroPage } from './add-carro.page';

describe('AddCarroPage', () => {
  let component: AddCarroPage;
  let fixture: ComponentFixture<AddCarroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
