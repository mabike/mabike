/*global AccountsTemplates, UserManager */
/*jshint camelcase:false */

/**
 * Configuration of the meteor-useraccounts rights management system
 */

var onSubmitHook = function( /*error, state*/ ) {
  UserManager.loggingIn();
  FlowRouter.reload();
};

var onLogoutHook = function() {
  UserManager.loggingOut();
  FlowRouter.go('home');
  FlowRouter.reload();
};

AccountsTemplates.configure({

  // Behavior

  confirmPassword: true, // TODO Implement password retrieval option, then this can be set to false
  // continuousValidation: false,
  // defaultState: 'signIn',
  // displayFormLabels: true,
  // enablePasswordChange: true,
  // enforceEmailVerification: true,
  // forbidClientAccountCreation: forbidClientAccountCreation,
  // overrideLoginErrors: true, // "login forbidden" instead of "wrong email" or "wrong password"
  // sendVerificationEmail: false,
  // showAddRemoveServices: false, // Allows user to add social service after login, requires accounts-meld package
  // showPlaceholders: true,
  socialLoginStyle: 'redirect', // 'popup' (redirect can be used on mobile, if webview cannot open window)
  // lowercaseUsername: false,
  focusFirstInput: !Meteor.isCordova,


  // Appearance

  // hideSignInLink: false,
  // hideSignUpLink: false,
  // showAddRemoveServices: false,
  // showForgotPasswordLink: !forbidClientAccountCreation,
  // showLabels: true,
  // showPlaceholders: true,
  // showResendVerificationEmailLink: false,


  // Client-side Validation

  // formValidationFeedback: true,
  // continuousValidation: false, // validates while user is typing
  // negativeFeedback: false, // highlight fields on negative validation
  // negativeValidation: true,
  // positiveValidation: true,
  // positiveFeedback: true,
  showValidating: true,


  // Privacy Policy and Terms of Use

  privacyUrl: '#',
  termsUrl: '#',
  // privacyUrl: 'privacy',
  // termsUrl: 'terms-of-use',


  // Redirects

  homeRoutePath: '/',
  // redirectTimeout: 2000, // timeout for redirect after enrollAccount, forgotPwd, resetPwd, verifyEmail


  // Hooks

  onLogoutHook: onLogoutHook,
  onSubmitHook: onSubmitHook,
  // preSignUpHook: myPreSubmitFunc,
  // postSignUpHook: postSignUpHook,

  // Texts

  texts: {

    // button: {
    //   changePwd: "Password Text",
    //   enrollAccount: "Enroll Text",
    //   forgotPwd: "Forgot Pwd Text",
    //   resetPwd: "Reset Pwd Text",
    //   signIn: "Sign In Text",
    //   signUp: "Sign Up Text",
    // },

    title: {
      //   changePwd: "Password Title",
      //   enrollAccount: "Enroll Title",
      //   forgotPwd: "Forgot Pwd Title",
      //   resetPwd: "Reset Pwd Title",
      // signIn: openToPublic ? "signIn" : "welcome",
      //   signUp: "Sign Up Title",
      //   verifyEmail: "Verify Email Title",
    },

    errors: {
      // accountsCreationDisabled: "Client side accounts creation is disabled!!!",
      // cannotRemoveService: "Cannot remove the only active service!",
      // captchaVerification: "Captcha verification failed!",
      // loginForbidden: "error.accounts.Login forbidden",
      mustBeLoggedIn: "" //"error.accounts.Must be logged in",
        // pwdMismatch: "error.pwdsDontMatch",
        // validationErrors: "Validation Errors",
        // verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
    },

    // info: {
    //   emailSent: "info.emailSent",
    //   emailVerified: "info.emailVerified",
    //   pwdChanged: "info.passwordChanged",
    //   pwdReset: "info.passwordReset",
    //   pwdSet: "info.passwordReset",
    //   signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
    //   verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
    // },

    // navSignIn: "signIn",
    // navSignOut: "signOut",
    // optionalField: "optional",
    // pwdLink_pre: "",
    // pwdLink_link: "forgotPassword",
    // pwdLink_suff: "",
    // requiredField: 'requiredField',
    // resendVerificationEmailLink_pre: "Verification email lost?",
    // resendVerificationEmailLink_link: "Send again",
    // resendVerificationEmailLink_suff: "",
    // sep: "OR",
    // signInLink_pre: "ifYouAlreadyHaveAnAccount",
    // signInLink_link: "signin",
    // signInLink_suff: "",
    // signUpLink_pre: "dontHaveAnAccount",
    // signUpLink_link: "signUp",
    // signUpLink_suff: "",
    // socialAdd: "add",
    // socialConfigure: "configure",
    // socialIcons: {
    //   google: "myGoogleIcon",
    //   "meteor-developer": "fa fa-rocket",
    // },
    // socialRemove: "remove",
    socialSignIn: '', // "signIn"
    socialSignUp: '', // "signUp"
    socialWith: '', // "with"
    // termsPreamble: "clickAgree",
    // termsPrivacy: "privacyPolicy",
    // termsAnd: "and",
    // termsTerms: "terms"

    // inputIcons: {
    //     isValidating: "fa fa-spinner fa-spin",
    //     hasSuccess: "fa fa-check",
    //     hasError: "fa fa-times",
    // }
  },


  // Routing

  // defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
  // defaultTemplate: 'login',
  // defaultLayout: 'layoutWebappMain',
  // defaultLayoutRegions: {},
  // defaultContentRegion: 'mainCanvas'

});

// TODO i18n

if (Meteor.isServer) {
  Meteor.methods({
    "userExists": function(username) {
      check(username, String);
      var userExists = !!Meteor.users.findOne({
        username: username
      });
      return userExists;
    },
  });
}

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 3,
    trim: true,
    showValidating: true,
    func: function(value) {
      if (Meteor.isClient) {
        var self = this;
        //self.setValidating(true);
        Meteor.call("userExists", value, function(err, userExists) {
          if (!userExists) {
            self.setSuccess();
          } else {
            self.setError(userExists);
          }
          self.setValidating(false);
        });
        return;
      }
      // Server
      if (Meteor.isServer) {
        return Meteor.call("userExists", value);
      }
    }
  }, {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
  pwd
]);

// Routes; must be defined after the general config above

// const template = 'login';
// const layoutTemplate = 'layoutWebappMain';
// const layoutRegions = {
//   appMenu: 'chromeAppMenu'
// };
// const contentRegion = 'mainCanvas';

// AccountsTemplates.configureRoute('signIn', {
//   name: 'login',
//   path: '/login',
//   template: template,
//   layoutTemplate: layoutTemplate,
//   layoutRegions: layoutRegions,
//   contentRegion: contentRegion
// });
//
//
// AccountsTemplates.configureRoute('signUp', {
//   name: 'signUp',
//   path: '/signup',
//   template: template,
//   layoutTemplate: layoutTemplate,
//   layoutRegions: layoutRegions,
//   contentRegion: contentRegion
// });
//
// AccountsTemplates.configureRoute('forgotPwd', {
//   name: 'forgotPwd',
//   path: '/forgot-password',
//   template: template,
//   layoutTemplate: layoutTemplate,
//   layoutRegions: layoutRegions,
//   contentRegion: contentRegion
// });
//
// AccountsTemplates.configureRoute('resetPwd', {
//   name: 'resetPwd',
//   path: '/reset-password',
//   template: template,
//   layoutTemplate: layoutTemplate,
//   layoutRegions: layoutRegions,
//   contentRegion: contentRegion
// });


// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('verifyEmail');
