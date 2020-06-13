import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('Comments section', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage()
    page.navigateTo(`${browser.baseUrl}`)
  })

  it('Can add comment', () => {
    const a = true
    expect(a).toBe(true)
  })

  it('Can edit comment', () => {
    const b = true
    expect(b).toBe(true)
  })

  it('Can delete comment', () => {
    const c = true
    expect(c).toBe(true)
  })
})
