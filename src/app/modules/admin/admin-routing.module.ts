import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AdminGuard } from './guards';

// Pages
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategoryComponent } from './pages/categories/edit-category/edit-category.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { EditCompanyComponent } from './pages/companies/edit-company/edit-company.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminPanelComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'users',
        canActivate: [ AdminGuard ],
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
        canActivate: [ AdminGuard ],
        children: [
          {
            path: '',
            component: CategoriesComponent
          },
          {
            path: 'edit',
            component: EditCategoryComponent
          }
        ]
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            component: CompaniesComponent,
          },
          {
            path: 'edit',
            component: EditCompanyComponent
          }
        ]
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
