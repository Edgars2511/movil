import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerNotaPageRoutingModule } from './ver-nota-routing.module';

import { VerNotaPage } from './ver-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNotaPageRoutingModule
  ],
  declarations: [VerNotaPage]
})
export class VerNotaPageModule {}
