export default {
    dashboard: {
  title: 'Dashboard',
  subtitle: 'Welcome to the system 👋'
},
allServices: {
  title: 'All Services',
  subtitle: 'You are on the all services page.'
},
forgotPassword: {
  heroTitle: 'Recover\nyour access.',
  heroDesc: 'Follow the steps to securely reset your password.',
  stepLabel: 'Step {step} of 3',
  stepDone: 'Done',

  step1Title: 'Forgot your password?',
  step1Subtitle: 'Enter your email and we will send a verification code.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'your@email.com',
  sendCode: 'Send code',
  sending: 'Sending...',
  backToLogin: 'Back to login',

  step2Title: 'Check your email',
  step2Subtitle: 'We sent a 4-digit code to',
  verifyCode: 'Verify code',
  noCode: "Didn't receive it?",
  resend: 'Resend code',
  back: 'Back',

  step3Title: 'New password',
  step3Subtitle: 'Create a strong password to protect your account.',
  newPassword: 'New password',
  confirmPassword: 'Confirm password',
  resetPassword: 'Reset password',
  saving: 'Saving...',

  step4Title: 'Password reset!',
  step4Subtitle: 'Your password has been changed successfully.',
  goToLogin: 'Go to login',

  errorEmail: 'Enter your email',
  errorSendEmail: 'Error sending email. Please try again.',
  errorCode: 'Enter the complete code',
  errorInvalidCode: 'Invalid or expired code.',
  errorNewPassword: 'Enter the new password',
  errorPasswordMismatch: 'Passwords do not match',
  errorReset: 'Error resetting password. Please try again.'
},
login: {
  heroTitle: 'Your workshop.\nIn total control.',
  heroDesc: 'Manage service orders, inventory and clients in one professional panel.',
  statWorkshops: 'Active workshops',
  statSatisfaction: 'Satisfaction',
  statProductivity: 'More productive',
  cardTitle: 'Welcome back',
  cardSubtitle: 'Sign in to your account to continue',
  emailLabel: 'E-mail',
  emailPlaceholder: 'your@email.com',
  passwordLabel: 'Password',
  forgotPassword: 'Forgot your password?',
  loginBtn: 'Sign in to platform',
  authenticating: 'Authenticating...',
  noAccount: "Don't have an account?",
  createAccount: 'Create free account',
  secureConnection: 'Secure and encrypted connection',
  errorLogin: 'Invalid email or password'
},
newServiceOrder: {
  title: 'New Service Order',
  subtitle: 'Fill in the details to register the vehicle entry',
  osLabel: 'SO No.',

  vehicleSection: 'Vehicle Details',
  clientSection: 'Client Details',
  workshopSection: 'Workshop Details',

  plate: 'License Plate',
  platePlaceholder: 'ABC-1234',
  mileage: 'Mileage',
  mileagePlaceholder: 'e.g. 45000',

  customerName: 'Customer Name',
  customerNamePlaceholder: 'Enter customer name',
  phone: 'Customer Phone',
  phonePlaceholder: '(00) 00000-0000',

  employee: 'Responsible Employee',
  employeePlaceholder: 'Employee name',
  boxNumber: 'Box Number',
  boxPlaceholder: 'e.g. 3',
  entryDate: 'Entry Date',

  cancel: 'Cancel',
  register: 'Register Order',
  saving: 'Saving...',

  errorPlate: 'Enter the license plate',
  errorCustomer: 'Enter the customer name',
  errorPhone: 'Enter the customer phone',
  errorMileage: 'Enter the mileage',
  errorEmployee: 'Enter the responsible employee',
  errorBox: 'Enter the box number',
  errorDate: 'Enter the entry date',
  errorSave: 'Error registering order. Please try again.'
},
  sidebar: {
    newService: 'New Service',
    allServices: 'All Services',
    settings: 'Settings',
    logout: 'Logout'
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your account and workshop information',
    tabWorkshop: 'Workshop',
    tabAccount: 'My Account',

    // Workshop
    workshopInfo: 'Workshop Information',
    workshopInfoSub: 'Your business registration data',
    workshopName: 'Workshop Name',
    workshopNamePlaceholder: 'Workshop name',
    cnpj: 'CNPJ',
    cnpjPlaceholder: '00.000.000/0000-00',
    phone: 'Phone',
    phonePlaceholder: '(00) 00000-0000',
    address: 'Address',
    addressPlaceholder: 'Street, number, neighborhood, city',

    // User
    accountInfo: 'My Account',
    accountInfoSub: 'Your user information',
    email: 'E-mail',
    emailPlaceholder: 'your@email.com',
    accessType: 'Access type',
    newPassword: 'New password',
    newPasswordOptional: '(optional)',
    confirmPassword: 'Confirm new password',

    // Language
    language: 'Language',
    languageSub: 'Choose the interface language',
    langBrowser: 'Browser language',
    langPt: 'Portuguese',
    langEn: 'English',
    langEs: 'Spanish',

    // Actions
    edit: 'Edit',
    save: 'Save changes',
    saving: 'Saving...',
    cancel: 'Cancel',

    // Footer info
    workshopId: 'Workshop ID',
    registeredAt: 'Registered on',
    userId: 'User ID',

    // States
    loading: 'Loading information...',
    noWorkshop: 'No workshop linked',
    noWorkshopSub: 'Your account is not linked to a workshop.',

    // Errors
    errorSave: 'Error saving. Please try again.',
    passwordMismatch: 'Passwords do not match'
  }
}