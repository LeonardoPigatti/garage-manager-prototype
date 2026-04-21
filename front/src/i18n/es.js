export default {
    dashboard: {
  title: 'Dashboard',
  subtitle: 'Bienvenido al sistema 👋'
},
allServices: {
  title: 'Todos los Servicios',
  subtitle: 'Estás en la página de todos los servicios.'
},
forgotPassword: {
  heroTitle: 'Recupera\ntu acceso.',
  heroDesc: 'Sigue los pasos para restablecer tu contraseña de forma segura.',
  stepLabel: 'Paso {step} de 3',
  stepDone: 'Completado',

  step1Title: '¿Olvidaste tu contraseña?',
  step1Subtitle: 'Ingresa tu correo y te enviaremos un código de verificación.',
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'tu@correo.com',
  sendCode: 'Enviar código',
  sending: 'Enviando...',
  backToLogin: 'Volver al inicio',

  step2Title: 'Verifica tu correo',
  step2Subtitle: 'Enviamos un código de 4 dígitos a',
  verifyCode: 'Verificar código',
  noCode: '¿No lo recibiste?',
  resend: 'Reenviar código',
  back: 'Volver',

  step3Title: 'Nueva contraseña',
  step3Subtitle: 'Crea una contraseña segura para proteger tu cuenta.',
  newPassword: 'Nueva contraseña',
  confirmPassword: 'Confirmar contraseña',
  resetPassword: 'Restablecer contraseña',
  saving: 'Guardando...',

  step4Title: '¡Contraseña restablecida!',
  step4Subtitle: 'Tu contraseña ha sido cambiada exitosamente.',
  goToLogin: 'Ir al inicio',

  errorEmail: 'Ingresa tu correo',
  errorSendEmail: 'Error al enviar correo. Inténtalo de nuevo.',
  errorCode: 'Ingresa el código completo',
  errorInvalidCode: 'Código inválido o expirado.',
  errorNewPassword: 'Ingresa la nueva contraseña',
  errorPasswordMismatch: 'Las contraseñas no coinciden',
  errorReset: 'Error al restablecer. Inténtalo de nuevo.'
},
login: {
  heroTitle: 'Tu taller.\nEn control total.',
  heroDesc: 'Gestiona órdenes de servicio, inventario y clientes en un solo panel profesional.',
  statWorkshops: 'Talleres activos',
  statSatisfaction: 'Satisfacción',
  statProductivity: 'Más productivo',
  cardTitle: 'Bienvenido de nuevo',
  cardSubtitle: 'Inicia sesión para continuar',
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'tu@correo.com',
  passwordLabel: 'Contraseña',
  forgotPassword: '¿Olvidaste tu contraseña?',
  loginBtn: 'Entrar a la plataforma',
  authenticating: 'Autenticando...',
  noAccount: '¿No tienes una cuenta?',
  createAccount: 'Crear cuenta gratis',
  secureConnection: 'Conexión segura y cifrada',
  errorLogin: 'Correo o contraseña inválidos'
},
newServiceOrder: {
  title: 'Nueva Orden de Servicio',
  subtitle: 'Completa los datos para registrar la entrada del vehículo',
  osLabel: 'N° de OS',

  vehicleSection: 'Datos del Vehículo',
  clientSection: 'Datos del Cliente',
  workshopSection: 'Datos del Taller',

  plate: 'Matrícula del Vehículo',
  platePlaceholder: 'ABC-1234',
  mileage: 'Kilometraje',
  mileagePlaceholder: 'Ej: 45000',

  customerName: 'Nombre del Cliente',
  customerNamePlaceholder: 'Ingresa el nombre del cliente',
  phone: 'Teléfono del Cliente',
  phonePlaceholder: '(00) 00000-0000',

  employee: 'Empleado Responsable',
  employeePlaceholder: 'Nombre del empleado',
  boxNumber: 'Número de Box',
  boxPlaceholder: 'Ej: 3',
  entryDate: 'Fecha de Entrada',

  cancel: 'Cancelar',
  register: 'Registrar Orden',
  saving: 'Guardando...',

  errorPlate: 'Ingresa la matrícula del vehículo',
  errorCustomer: 'Ingresa el nombre del cliente',
  errorPhone: 'Ingresa el teléfono del cliente',
  errorMileage: 'Ingresa el kilometraje',
  errorEmployee: 'Ingresa el empleado responsable',
  errorBox: 'Ingresa el número de box',
  errorDate: 'Ingresa la fecha de entrada',
  errorSave: 'Error al registrar la orden. Inténtalo de nuevo.'
},
  sidebar: {
    newService: 'Nuevo Servicio',
    allServices: 'Todos los Servicios',
    settings: 'Configuración',
    logout: 'Salir'
  },
  settings: {
    title: 'Configuración',
    subtitle: 'Gestiona la información de tu cuenta y taller',
    tabWorkshop: 'Taller',
    tabAccount: 'Mi Cuenta',

    // Taller
    workshopInfo: 'Información del Taller',
    workshopInfoSub: 'Datos de registro de tu negocio',
    workshopName: 'Nombre del Taller',
    workshopNamePlaceholder: 'Nombre del taller',
    cnpj: 'CNPJ',
    cnpjPlaceholder: '00.000.000/0000-00',
    phone: 'Teléfono',
    phonePlaceholder: '(00) 00000-0000',
    address: 'Dirección',
    addressPlaceholder: 'Calle, número, barrio, ciudad',

    // Usuario
    accountInfo: 'Mi Cuenta',
    accountInfoSub: 'Información de tu usuario',
    email: 'Correo electrónico',
    emailPlaceholder: 'tu@correo.com',
    accessType: 'Tipo de acceso',
    newPassword: 'Nueva contraseña',
    newPasswordOptional: '(opcional)',
    confirmPassword: 'Confirmar nueva contraseña',

    // Idioma
    language: 'Idioma',
    languageSub: 'Elige el idioma de la interfaz',
    langBrowser: 'Idioma del navegador',
    langPt: 'Portugués',
    langEn: 'Inglés',
    langEs: 'Español',

    // Acciones
    edit: 'Editar',
    save: 'Guardar cambios',
    saving: 'Guardando...',
    cancel: 'Cancelar',

    // Info pie
    workshopId: 'ID del Taller',
    registeredAt: 'Registrado el',
    userId: 'ID de Usuario',

    // Estados
    loading: 'Cargando información...',
    noWorkshop: 'Ningún taller vinculado',
    noWorkshopSub: 'Tu cuenta no está vinculada a un taller.',

    // Errores
    errorSave: 'Error al guardar. Inténtalo de nuevo.',
    passwordMismatch: 'Las contraseñas no coinciden'
  }
}