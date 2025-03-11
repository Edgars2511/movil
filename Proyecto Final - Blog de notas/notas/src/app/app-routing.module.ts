import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'nota',
    loadChildren: () => import('./pages/nota/nota.module').then( m => m.NotaPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./pages/modales/task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'ver-nota/:id',
    loadChildren: () => import('./pages/ver-nota/ver-nota.module').then( m => m.VerNotaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
