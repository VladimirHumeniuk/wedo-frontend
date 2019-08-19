import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule
} from '@nebular/theme';

// Modules
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './shared/shared.module';

// Layout components
import { LayoutComponent } from './layout/layout.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';

// Components
import { AppComponent } from './app.component';

// Ngrx
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effect';

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
    EffectsModule.forRoot([UserEffects]),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbThemeModule.forRoot({ name: 'default' }),
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
