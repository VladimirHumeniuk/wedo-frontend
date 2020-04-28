import { Component, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'wd-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  public isPopoverOpened: boolean = false;

  @ViewChild('popoverWrapper') popoverWrapper: any;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

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
