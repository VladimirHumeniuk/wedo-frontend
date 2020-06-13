import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('Sign Up page', () => {
  let page: AppPage

  const accountType = element(by.css('#accountType button'))
  const email = element(by.id('email'))
  const password = element(by.id('password'))
  const confirmPassword = element(by.id('confirmPassword'))
  const acceptTermsAndConditions = element(by.className('custom-checkbox'))
  const submit = element(by.css('button[type=submit]'))

  beforeAll(() => {
    page = new AppPage()
    page.navigateTo(`${browser.baseUrl}sign-up`)
  })

  afterAll(() => {
    browser.ignoreSynchronization = false;
  })

  it('by default submit button should be disabled', () => {
    expect(submit.getAttribute('disabled')).toBe('true')
  })

  it('account should be created', () => {
    accountType.click()
    element(by.id('nb-option-0')).click()

    email.sendKeys('e2e-test@gib.do')
    password.sendKeys('e2e-test')
    confirmPassword.sendKeys('e2e-test')

    acceptTermsAndConditions.click()

    expect(submit.getAttribute('disabled')).toBe(null)

    browser.ignoreSynchronization = true;

    submit.click()
    browser.sleep(5000)
    expect(browser.getCurrentUrl()).toMatch(`${browser.baseUrl}verify-email`)
  })
})
