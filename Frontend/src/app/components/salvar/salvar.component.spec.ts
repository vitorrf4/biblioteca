import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarComponent } from './salvar.component';

describe('CadastrarComponent', () => {
  let component: SalvarComponent;
  let fixture: ComponentFixture<SalvarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalvarComponent]
    });
    fixture = TestBed.createComponent(SalvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
