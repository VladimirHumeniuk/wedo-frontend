import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { Observable, of } from 'rxjs';
import { AuthService } from '../services';
import { User } from '../models';

@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(
    private authService: AuthService,
  ) { }

  resolve() {
    return this.authService.getCurrent()
  }
}