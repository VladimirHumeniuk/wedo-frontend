import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule
} from '@nebular/theme';

// Modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './modules/core/core.module';

// Layout components
import { LayoutComponent } from './layout/layout.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';

// Components
import { AppComponent } from './app.component';

// Reducers
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
