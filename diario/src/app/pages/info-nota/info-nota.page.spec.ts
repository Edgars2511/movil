import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoNotaPage } from './info-nota.page';

describe('InfoNotaPage', () => {
  let component: InfoNotaPage;
  let fixture: ComponentFixture<InfoNotaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
