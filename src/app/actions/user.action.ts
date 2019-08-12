import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from './../shared/models';

export const SAVE_USER   = '[USER] Save'
export const REMOVE_USER = '[USER] Remove'

export class SaveUser implements Action {
  readonly type = SAVE_USER

  constructor (public payload: User) {}
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER
}

export type Actions = SaveUser | RemoveUser