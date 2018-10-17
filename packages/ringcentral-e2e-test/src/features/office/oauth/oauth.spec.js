/* eslint-disable */
/* global $, page, browser, driver, context */
import { createProcess } from 'marten';
import AuthorizeOffice from '../../../steps/office/authorizeOffice';
import Login from '../../../steps/office/login';
import Entry from '../../../steps/entry';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
})

afterEach(async() => {
  // await browser.close();
})

/** Go to setting page
 * @param isAuth {bool} the office account is auth or unauth
 * User should be able to view below authorized message:
 * - required: Office 365 icon
 * - if is auth: Authorised Account:i button
 * - if is auth: Unauthorise button, Button should be highlight and clickable
 * - if is unauth: Authorise button, Button should be highlight and clickable
 */
async function detectAuthPanel(isAuth) {
  await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
  await $(page).click('div[title="More Menu"]', { selector: 'css' });
  await $(page).waitFor('div[title="Settings"]', { selector: 'css' });
  await $(page).click('div[title="Settings"]', { selector: 'css' });
  if (isAuth) {
    await $(page).waitFor(1000);
    $(page).waitFor("span[class*='src-components-AuthorizeSettingsPanel-_styles_title']", { selector: 'css' });
    const authTitle = await $(page).getText("span[class*='AuthorizeSettingsPanel-_styles_title']", { selector: 'css' });
    expect(authTitle).toEqual('Authorized Account');
   // $(page).waitFor("[class*='AuthorizeSettingsPanel-_styles_tooltip']", { selector: 'css' });
   // const authTooltip = await $(page).getText("[class*='AuthorizeSettingsPanel-_styles_tooltip']", { selector: 'css' });
   // expect(authTooltip).toEqual(`You have authorized RingCentral for Office365 to access your account ${option.officeAccout}`);

    const authButton = await $(page).getText('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    expect(authButton).toEqual('Unauthorize');
  } else {
    const authTitle = await $(page).getText("[class*='AuthorizeSettingsPanel-_styles_title']", { selector: 'css' });
    expect(authTitle).toEqual('');
    const authButton = await $(page).getText('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    expect(authButton).toEqual('Authorize');
  }
}

describe('RCI-330 - Authorize and Unauthorize RingCentral for Office 365', () => {
  test.skip({
    title: 'Go to Schedule Meeting',
    tags: [
      ['office', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        buttonText: 'Authorize',
        actionPrompt: 'Please authorize RingCentral to access your Google account information.',
        scheduleButton: 'Invite with Outlook Calendar',
      },
    ],
  }, async ({ option }) => {
    // Login CTI
    const params = context.options.config;
    const process = createProcess(
      Entry,
      Login,
    )(context);
    await process.exec();
    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Schedule Meeting"]', { selector: 'css' });
    await $(page).click('div[title="Schedule Meeting"]', { selector: 'css' });
    /** The layout of this page should be shown as below
     * 1. Ghost text "Please authorise RingCentral to access your Office account information."
     * 2. Authorize button
    **/
    const buttonText = await $(page).getText('button[class*="widgets-components-MeetingScheduleButton-_styles_button"]', { selector: 'css' });
    expect(buttonText).toEqual(option.buttonText);
    const actionPrompt = await $(page).getText("div[class*='styles_actionPrompt']", { selector: 'css' });
    expect(actionPrompt).toEqual(option.actionPrompt);
    /** Click the Authorize button, Enter Office account and password
     * go through the auth flow
     * check auth panel
     */
    await $(page).click("button[class*='widgets-components-MeetingScheduleButton-_styles_button']",{ selector: 'css' });
    await AuthorizeOffice.login();
    /** New meeting should be displayed
     *
    */
    await $(page).waitFor(2000);
    const inviteText = await $(page).getText("div[class*='styles_inviteBox'] > button", { selector: 'css' });
    expect(inviteText).toEqual(option.scheduleButton);
   // debugger;
    /** Go to setting page
     *  */
    await detectAuthPanel(true);
    /** Click logout and relogin
     *  User still Authorized
     */
    await $(page).waitFor('[class*="SettingsPanel-_styles_logoutIcon"]', { selector: 'css' });
    await $(page).click('[class*="SettingsPanel-_styles_logoutIcon"]', { selector: 'css' });
    Login.login();
    await detectAuthPanel(true);
    /** Click the Unauthorise button
     * User should be able to view below authorized message
     * Office 365 icon
     * Authorise button
     * Button should be highlight and clickable
     */
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await detectAuthPanel(false);
  });
  test.skip({
    title: 'Go to Schedule Conference, Click button {buttonText}, app should show alert message, lead user to auth account',
    tags: [
      ['office', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        buttonText: 'Invite with Office Calendar',
        alertMessage: 'We noticed you haven\'t authorized RingCentral for Office365 to access your Office365 account. Please click here to authorize'
      },
    ],
  }, async ({ option }) => {
    // Login CTI
    const params = context.options.config;
    const process = createProcess(
      Entry,
      Login,
    )(context);
    await process.exec();
    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Schedule Conference"]', { selector: 'css' });
    await $(page).click('div[title="Schedule Conference"]', { selector: 'css' });
    await $(page).waitFor('div[class*="styles_bottom"]>div[class*="ringcentral-widgets-components-Button"]', { selector: 'css' });
    await $(page).click('div[class*="styles_bottom"]>div[class*="ringcentral-widgets-components-Button"]', { selector: 'css' });
    await $(page).click('div[class*="styles_bottom"]>div[class*="ringcentral-widgets-components-Button"]', { selector: 'css' });
    // const clickHere = await $(page).$("a[class*='styles_clickHere']", { selector: 'css' });
    // await clickHere.click();
    await $(page).click("a[class*='styles_clickHere']", { selector: 'css' });
    const targets = await browser.targets();
    const officeAuthPage = await targets[targets.length - 1].page();
    await AuthorizeOffice.login(officeAuthPage);
    const alertMessage = await $(page).getText('div[class*="ringcentral-widgets-components-AlertDisplay"]', { selector: 'css' });
    //expect(alertMessage.includes(option.alertMessage)).toBe(true);
    /** Click the the `click here` to auth on alert message**/
    await detectAuthPanel(true);
    /** Click logout and relogin, user still Authorized **/
   // await $(page).waitFor('section > div[class*="styles_clickable"]', { selector: 'css' });
   // await $(page).click('section > div[class*="styles_clickable"]', { selector: 'css' });
    await $(page).waitFor('[class*="SettingsPanel-_styles_logoutIcon"]', { selector: 'css' });
    await $(page).click('[class*="SettingsPanel-_styles_logoutIcon"]', { selector: 'css' });
    debugger;
    await Login.login();
    detectAuthPanel(true);
    /** Click the Unauthorise button **/
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    detectAuthPanel(false);
  });
  test({
    title: 'O365 authorization flow(click authorization on setting panel)',
    tags: [
      ['office', { brands: ['rc'] }],
    ],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {
        authSuccess: 'Authorized Account',
      },
    ],
  }, async ({ option }) => {
    // Login CTI
    const params = context.options.config;
    const process = createProcess(
      Entry,
      Login,
    )(context);
    await process.exec();
    // Authroize Office365

    await $(page).waitFor('div[title="More Menu"]', { selector: 'css' });
    await $(page).click('div[title="More Menu"]', { selector: 'css' });
    await $(page).waitFor('div[title="Settings"]', { selector: 'css' });
    await $(page).click('div[title="Settings"]', { selector: 'css' });
    await $(page).waitFor('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await $(page).waitFor(2000);
    const targets = await browser.targets();
    const officeAuthPage = await targets[targets.length - 1].page();
    await AuthorizeOffice.login(officeAuthPage);
    await detectAuthPanel(true);
    /** Click logout and relogin, user still Authorized **/
    await $(page).waitFor('section > div[class*="styles_clickable"]', { selector: 'css' });
    await $(page).click('section > div[class*="styles_clickable"]', { selector: 'css' });
    debugger;
    Login.login();
    await detectAuthPanel(true);
    /** Click the Unauthorise button **/
    await $(page).click('button[class*="AuthorizeSettingsPanel"]', { selector: 'css' });
    await detectAuthPanel(false);
  });
});
