import { NbToastrService } from '@nebular/theme';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  faFacebookF,
  faWhatsapp,
  faTelegramPlane,
  faTwitter,
  faFacebookMessenger,
  IconDefinition
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'wd-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent implements OnInit {

  @Input() social: string;
  @Input() popoverRef: any;

  public url: string = encodeURIComponent(window.location.href);

  public readonly icons: {[key: string]: IconDefinition | string} = {
    'facebook': faFacebookF,
    'whatsapp': faWhatsapp,
    'telegram': faTelegramPlane,
    'twitter': faTwitter,
    'facebookMessenger': faFacebookMessenger,
    'copy': 'copy-outline'
  }

  public readonly links: {[key: string]: string} = {
    'facebook': `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
    'whatsapp': `whatsapp://send?text=${this.url}`,
    'telegram': `tg://msg_url?url=${this.url}`,
    'twitter': `https://twitter.com/intent/tweet?text=${this.url}`,
    'facebookMessenger': `fb-messenger://share/?link=${this.url}&app_id=655998275132990`
  }

  constructor(
    private readonly toastrService: NbToastrService
  ) { }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(decodeURIComponent(this.url));
    this.toastrService.success('', `URL copied to clipboard`, { icon: 'copy-outline'});

    this.popoverRef.hide()
  }

  public socialShare(): void {
    const { links, social } = this

    window.open(links[social], '_blank')
  }

  ngOnInit() {
  }

}
