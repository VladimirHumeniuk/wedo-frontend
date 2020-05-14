export const FORMS_MESSAGES = {
  email: {
    generic: "We have unforeseen problems with this email address. Check the address or try again later",
    inUse: "The email address is already in use by another account",
    userNotFound: "We have no user record corresponding to this email address",
    toManyRequests: "We have blocked all requests from this device due to unusual activity. Try again later."
  },
  password: {
    wrongPasswordCurrent: "Incorrect password",
    wrongPassword: "The password is invalid or the user with this email does not exist",
    requiredLength: `Password length should be between 6 and 32 symbols`,
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
  },
  phone: {
    invalid: `Invalid phone number`
  },
  wysiwyg: {
    maxlength: `You have exceeded the maximum number of characters:`
  },
  category: {
    required: `Please select category`
  },
  shortDescription: {
    maxlength: `You have exceeded the maximum number of characters:`
  }
}