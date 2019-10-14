import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { fragmetTypes as introspectionQueryResultData } from './fragment-types';

import { environment } from 'src/environments/environment';

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
import { FooterComponent } from './layout/footer/footer.component';

// Components
import { AppComponent } from './app.component';

// Ngrx
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effect';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    EffectsModule.forRoot([UserEffects]),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbSpinnerModule,
    NbThemeModule.forRoot({ name: 'default' }),
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
