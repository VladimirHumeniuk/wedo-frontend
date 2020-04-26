import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'wd-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  public readonly MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Users',
      icon: 'person-outline',
      link: '/admin-panel/users',
      pathMatch: 'prefix'
    },
    {
      title: 'Cards',
      icon: 'file-text-outline',
    },
    {
      title: 'Requests',
      icon: 'bulb-outline',
    },
    {
      title: 'Bin',
      icon: 'trash-2-outline'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
