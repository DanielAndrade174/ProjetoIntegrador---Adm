import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeUsuarioPage } from './cadastro-de-usuario.page';

describe('CadastroDeUsuarioPage', () => {
  let component: CadastroDeUsuarioPage;
  let fixture: ComponentFixture<CadastroDeUsuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeUsuarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
