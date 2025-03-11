import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerNotaPage } from './ver-nota.page';

const routes: Routes = [
  {
    path: '',
    component: VerNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerNotaPageRoutingModule {}
