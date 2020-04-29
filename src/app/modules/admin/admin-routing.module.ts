import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AdminGuard } from './guards';

// Pages
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    component: AdminComponent,
    canActivate: [AdminGuard],
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
      },
      {
        path: 'categories',
        component: CategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AdminRoutingModule { }
