export default class LoginLocatorPage {
    static userNameField = 'id=user_name';
    static pwField = 'id=user_password';
    static submitButton = 'id=sysverb_login';
    static labelUsernameField = 'xpath=//input[@id="user_name"]/parent::div'
    static hiddenBtn = "id=mask_icon";
    static pwLabelParent = 'xpath=//*[@class="input-group password-group"]/parent::div';
    static labelTag = "//label";
    static languageIcon = 'xpath=//*[@aria-label="Concourse Picker"]';
    static languageApplicationScope = '.sn-drilldown-list-header.keyboard-navigatable.can-animate';
    static errMesLocator = '.outputmsg_text';
    static invalidAccErrMes = '.dp-invalid-login-msg'
}