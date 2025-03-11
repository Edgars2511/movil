import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TaskDetailModalComponent } from '../modales/task-detail-modal/task-detail-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ToolbarModule
  ],
  declarations: [
    Tab1Page,
    TaskDetailModalComponent // Asegúrate de incluir el componente en las declaraciones
  ]
})
export class Tab1PageModule {}
