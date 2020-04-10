export const AUTH_WITH_POPUP = {
  'auth/internal-error': {
    status: 'danger',
    message: 'Internal error occurred. Please try again later or try different Sign In method.'
  },
  'auth/account-exists-with-different-credential': {
    status: 'danger',
    message: 'An account already exists with the same email address but different sign-in credentials.',
    adviseUrl: '/request-password'
  },
  'auth/popup-closed-by-user': {
    status: 'warning',
    message: 'Login popup has been closed before finalizing the Sign In operation.'
  }
}