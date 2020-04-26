import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'wd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public tableColumns = [
    { title: 'uid', key: 'uid', options: { code: true } },
    { title: 'email', key: 'email' },
    { title: 'type', key: 'accountType' },
    { title: 'company', key: 'company', options: { code: true } },
    { title: 'created', key: 'created' }
  ]
  public actions = { edit: { active: true } }
  public users: any[]

  constructor(
    public readonly userService: UserService
  ) {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data
    })
  }

  edit(uid) {
    console.log(uid);
  }

  ngOnInit() {
  }

}
