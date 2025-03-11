import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerNotaPage } from './ver-nota.page';

describe('VerNotaPage', () => {
  let component: VerNotaPage;
  let fixture: ComponentFixture<VerNotaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
