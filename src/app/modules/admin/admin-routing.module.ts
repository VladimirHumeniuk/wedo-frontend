import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

// Pages
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminPanelComponent
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent
          },
          {
            path: 'edit',
            component: EditUserComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }