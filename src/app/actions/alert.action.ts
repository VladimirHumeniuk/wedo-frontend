import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Alert } from './../shared/models';

export const ADD_ALERT   = '[ALERT] Add'
export const REMOVE_ALERT = '[ALERT] Remove'

export class AddAlert implements Action {
  readonly type = ADD_ALERT

  constructor (public payload: Alert) {}
}

export class RemoveAlert implements Action {
  readonly type = REMOVE_ALERT

  constructor(public payload: number) {}
}

export type Actions = AddAlert | RemoveAlert