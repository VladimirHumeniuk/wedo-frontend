import { AppPage } from '../app.po';
import { element, by } from 'protractor';

export const logout = () => {
  const signOutButton = element.all(by.css('nav li:last-child')).first()
  signOutButton.click()
}