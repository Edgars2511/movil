import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CardsProductsComponent } from '../components/cards-products/cards-products.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    CardsProductsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],

  exports: [
    NavbarComponent,
    CardsProductsComponent
  ]
})
export class SharedModule { }
