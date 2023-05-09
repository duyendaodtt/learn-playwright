export default class ForgotPwPageLocator {
    static forgotPwBtn = 'text=Forgotten password?';
    static forgotPwBtn1 = 'xpath=//button[(text()="Forgotten password?")]'
    static forgotPwPopup = '.modal-card-head';
    static forgotPwPopupTitle = '.modal-card-title';
    static forgotPwPopupClose = '.delete';
    static popupEmailIcon = '//input[@name="fgEmail"]/following-sibling::span//*[@data-icon="envelope"]';
    static enterEmailField = 'xpath=//input[@name="fgEmail"]';
    // static resetPwBtn = 'xpath=//button[(text()="RESET")]';
    static resetPwBtn = 'xpath=//button[(text()="RESET")]';
    static forgotPopupBody = '.modal-card-body';
    static messageLocator = '.notification.is-primary';
    
}