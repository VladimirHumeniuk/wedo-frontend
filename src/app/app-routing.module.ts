import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/core/core.module#CoreModule',
  },
  {
    path: 'admin-panel',
    loadChildren: './modules/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
