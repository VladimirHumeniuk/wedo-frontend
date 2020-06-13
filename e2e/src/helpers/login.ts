import { AppPage } from '../app.po';
import { element, by, browser } from 'protractor';

export const login = (page: AppPage, type?: string) => {
  const email = element(by.id('email'))
  const password = element(by.id('password'))
  const submit = element(by.css('button[type=submit]'))

  page.navigateTo(`${browser.baseUrl}sign-in`)

  email.sendKeys('e2e-business@gib.du')
  password.sendKeys('123123')

  submit.click()
  browser.ignoreSynchronization = true;
}