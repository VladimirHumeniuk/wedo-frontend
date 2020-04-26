import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { fragmentTypes as introspectionQueryResultData } from './fragment-types';

import { environment } from 'src/environments/environment';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
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
    EffectsModule.forRoot([UserEffects]),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule,
    NbThemeModule.forRoot({ name: 'default' }),
    LeafletModule.forRoot(),
    // Apollo Setup
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
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
