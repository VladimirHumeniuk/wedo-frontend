import { Component, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'wd-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  public isPopoverOpened: boolean = false;

  @ViewChild('popoverWrapper', { static: false }) popoverWrapper: any;
  @ViewChild(NbPopoverDirective,  { static: false }) popover: NbPopoverDirective;

  constructor() { }

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
