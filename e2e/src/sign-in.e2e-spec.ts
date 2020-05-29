import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('Sign in page', () => {
  let page: AppPage

  const email = element(by.id('email'))
  const password = element(by.id('password'))
  const submit = element(by.css('button[type=submit]'))

  beforeAll(() => {
    page = new AppPage()
    page.navigateTo(`${browser.baseUrl}sign-in`)
    browser.sleep(1000)
  })

  afterAll(() => {
    browser.ignoreSynchronization = false;
  })

  it('by default submit button should be disabled', () => {
    expect(submit.getAttribute('disabled')).toBe('true')
  })

  it('login should work', () => {
    email.sendKeys('v.kuriakova@gib.do')
    password.sendKeys('123123')

    expect(submit.getAttribute('disabled')).toBe(null)

    browser.ignoreSynchronization = true;

    submit.click()
    browser.sleep(2500)
    expect(browser.getCurrentUrl()).toMatch(browser.baseUrl)
  })

  it('sign out should work', () => {
    const signOutButton = element.all(by.css('nav li:last-child')).first()
    signOutButton.click()

    expect(signOutButton.getText()).toMatch('SIGN UP')
  })
})
