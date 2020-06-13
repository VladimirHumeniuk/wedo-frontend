import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('Home page', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage()
    page.navigateTo(browser.baseUrl)
    browser.sleep(1000)
  })

  it('should render navigation bar', () => {
    const navbar = element(by.className('layout__header'))

    expect(navbar.isDisplayed()).toBe(true)
  })

  it('should render search bar', () => {
    const search = element(by.className('search-bar'))

    expect(search.isDisplayed()).toBe(true)
  })

  it('should load cards elements', () => {
    const cards = element.all(by.css('.card')).count()

    expect(cards).toBeGreaterThan(0)
  })

  it('should render footer elements', () => {
    const search = element(by.className('footer'))

    expect(search.isDisplayed()).toBe(true)
  })
})
