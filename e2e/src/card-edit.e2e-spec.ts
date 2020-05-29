import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';
import { login } from './helpers/login';
import { logout } from './helpers/logout';

describe('Edit company card', () => {
  let page: AppPage;

  const title = element(by.id('title'))
  const textarea = element(by.id('shortDescription'))
  const category = element(by.css('#category'))
  const submit = element(by.css('button[type=submit]'))

  beforeAll(() => {
    page = new AppPage()
    login(page)
    browser.sleep(2000)
    browser.ignoreSynchronization = false;
  })

  afterAll(() => {
    browser.ignoreSynchronization = false;
    logout()
  })

  it('textarea should be available', () => {
    page.navigateTo(`${browser.baseUrl}my-company-card`)

    const test_value = 'test_value'
    textarea.sendKeys(test_value)

    expect(textarea.getAttribute('disabled')).toBe(null)
    expect(textarea.getAttribute('value')).toContain(test_value)
  })

  it('forms validation should works correctly', () => {
    title.sendKeys('E2E Test Company')

    category.click()
    element(by.css('.ng-option:first-child')).click()

    textarea.sendKeys('Test description')
    expect(submit.getAttribute('disabled')).toBe(null)
  })

  // it('should save company on submit', () => {
  //   title.sendKeys('E2E Test Company')

  //   category.click()
  //   element(by.id('nb-option-0')).click()

  //   textarea.sendKeys('Test description')
  //   submit.click()
  //   browser.sleep(2000)

  //   expect
  // })
})
