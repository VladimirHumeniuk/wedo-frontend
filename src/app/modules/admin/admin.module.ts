import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbIconModule,
  NbMenuModule
} from '@nebular/theme';

// Modules
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Layout
import { LayoutComponent } from './layout/layout.component';
import { SidebarNavigationComponent } from './layout/sidebar-navigation/sidebar-navigation.component';

// Pages
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

// Components
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { TitleComponent } from './components/title/title.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminComponent,
    LayoutComponent,
    SidebarNavigationComponent,
    UsersComponent,
    TitleComponent,
    DataTableComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbIconModule,
    SharedModule
  ]
})
export class AdminModule { }