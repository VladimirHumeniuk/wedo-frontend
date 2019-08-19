import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from './../../shared/models';

export const SAVE_USER = '[USER] Save'
export const REMOVE_USER = '[USER] Remove'

export const GET_USER = '[AUTH] Get User'
export const AUTHENTICATED = '[AUTH] Authenticated'
export const NOT_AUTHENTICATED = '[AUTH] Not Authenticated'
export const AUTH_ERROR = '[AUTH] ERROR'

export class SaveUser implements Action {
    readonly type = SAVE_USER;

    constructor(public payload: User) { }
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER;
}

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload?: any) {
    }
}

export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) {
    }
}
export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) {
    }
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) {
    }
}

export type Actions = SaveUser
    | RemoveUser
    | GetUser
    | Authenticated
    | NotAuthenticated
    | AuthError;
