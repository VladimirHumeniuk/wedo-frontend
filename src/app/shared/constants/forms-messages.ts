export const FORMS_MESSAGES = {
  email: {
    generic: "We have unforeseen problems with this email address. Check the address or try again later",
    required: "Email is required",
    pattern: "Email address is not valid",
    inUse: "The email address is already in use by another account",
    userNotFound: "We have no user record corresponding to this email address",
    toManyRequests: "We have blocked all requests from this device due to unusual activity. Try again later."
  },
  password: {
    required: "Password is required",
    wrongPassword: "The password is invalid or the user with this email does not exist",
    minlength: `Password min length: 6 symbols`,
    maxlength: `Password max length: 32 symbols`
  },

  confirmPassword: {
    required: "Please confirm password",
    mustMatch: "Passwords must match"
  },
  accountType: {
    required: "Choose account type"
  },
  acceptTermsAndConditions: {
    required: "Please indicate that you have read and agree to the Terms and Conditions"
  },
  imageUpload: {
    type: `Uploaded file is not a valid image.\nOnly JPG, JPEG and PNG files are allowed.`,
    size: "Image exceeded maximum size of"
  }
}