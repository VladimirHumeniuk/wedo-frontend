import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloBoostModule, ApolloBoost } from 'apollo-angular-boost';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ApolloBoostModule
  ]
})
export class GraphQLModule {
  constructor(
    public apolloBoost: ApolloBoost
  ) {
    apolloBoost.create({
      uri: 'http://localhost:4000/graphql'
    })
  }
}
