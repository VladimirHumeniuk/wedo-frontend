import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { fragmentTypes as introspectionQueryResultData } from './fragment-types';
import { NgAisModule } from 'angular-instantsearch';

import { environment } from 'src/environments/environment';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbToastrModule,
  NbThemeModule
} from '@nebular/theme';

// Modules
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Ngrx
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effect';
import { AlertEffects } from 'src/app/store/effects/alert.effect';
import { AdminEffects } from 'src/app/store/effects/admin.effect';
import { CategoriesEffects } from 'src/app/store/effects/categories.effect';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule,
    EffectsModule.forRoot([
      UserEffects,
      AlertEffects,
      AdminEffects,
      CategoriesEffects
    ]),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule,
    NbToastrModule.forRoot({ duration: 4000 }),
    NbThemeModule.forRoot({ name: 'default' }),
    NgAisModule.forRoot(),
    // Apollo Setup
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: environment.apolloServerUrl }),
      cache: new InMemoryCache({fragmentMatcher})
    });
  }
}
