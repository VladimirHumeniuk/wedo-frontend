import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { CompanyCard } from 'src/app/shared/models';

@Component({
  selector: 'wd-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  private cid: string
  public cardDetails: CompanyCard

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) { }

  public getCompany(cid: string): void {
    this.userService.getCompany(cid)
    .subscribe((companyCard: CompanyCard) => {
      this.cardDetails = companyCard
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const cid = params.get('cid')
      this.getCompany(cid)
    })
  }
}
