import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'wd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public needHeader: boolean = true
  private noHeaderRoutes: Array<string> = ['sign-in', 'sign-up']

  constructor(
    protected router: Router
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url.substr(1)

        if (this.noHeaderRoutes.indexOf(currentUrl) > -1) {
          this.needHeader = false
        }
      }
    })
  }

  ngOnInit() {}

}
