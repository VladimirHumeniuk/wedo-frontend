import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
  NbIconModule,
  NbMenuModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

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

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminComponent,
    LayoutComponent,
    SidebarNavigationComponent,
    UsersComponent,
    TitleComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    Ng2SmartTableModule,
    Ng2CompleterModule,
    NbIconModule,
    SharedModule
  ]
})
export class AdminModule { }
