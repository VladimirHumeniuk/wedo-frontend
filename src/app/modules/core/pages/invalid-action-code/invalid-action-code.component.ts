import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'wd-invalid-action-code',
  templateUrl: './invalid-action-code.component.html',
  styleUrls: ['./invalid-action-code.component.scss']
})
export class InvalidActionCodeComponent {

  public queryParams: Params

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length > 0) {
        this.queryParams = params
      } else {
        this.router.navigate(['/'])
      }
    })
  }

}
