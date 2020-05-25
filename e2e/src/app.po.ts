import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(page: string) {
    return browser.get(page) as Promise<any>;
  }
}
