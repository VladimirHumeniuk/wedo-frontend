import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faFacebookF,
  faWhatsapp,
  faTelegramPlane,
  faTwitter,
  faFacebookMessenger,
  IconDefinition
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'wd-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  public faFacebookF: IconDefinition = faFacebookF;
  public faWhatsapp: IconDefinition = faWhatsapp;
  public faTelegramPlane: IconDefinition = faTelegramPlane;
  public faTwitter: IconDefinition = faTwitter;
  public faFacebookMessenger: IconDefinition = faFacebookMessenger;

  public isPopoverOpened: boolean = false;

  @ViewChild('popoverWrapper', { static: false }) popoverWrapper: any;

  constructor() {
  }

  public focusPopoverWrapper(): void {
    this.isPopoverOpened = !this.isPopoverOpened

    if (this.isPopoverOpened) {
      setTimeout(() => {
        this.popoverWrapper.nativeElement.focus();
      }, 100)
    }
  }

  ngOnInit() {
  }

}
