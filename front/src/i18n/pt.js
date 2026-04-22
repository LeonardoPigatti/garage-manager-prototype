export default {
  dashboard: {
  title: 'Dashboard',
  subtitle: 'Bem-vindo ao sistema 👋'
},
allServices: {
  title: 'Todos os Serviços',
  subtitle: 'Listagem completa das ordens de serviço.'
},
forgotPassword: {
  heroTitle: 'Recupere\nseu acesso.',
  heroDesc: 'Siga os passos para redefinir sua senha com segurança.',
  stepLabel: 'Passo {step} de 3',
  stepDone: 'Concluído',

  // Step 1
  step1Title: 'Esqueceu a senha?',
  step1Subtitle: 'Digite seu e-mail e enviaremos um código de verificação.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  sendCode: 'Enviar código',
  sending: 'Enviando...',
  backToLogin: 'Voltar ao login',

  // Step 2
  step2Title: 'Verifique seu e-mail',
  step2Subtitle: 'Enviamos um código de 4 dígitos para',
  verifyCode: 'Verificar código',
  noCode: 'Não recebeu?',
  resend: 'Reenviar código',
  back: 'Voltar',

  // Step 3
  step3Title: 'Nova senha',
  step3Subtitle: 'Crie uma senha forte para proteger sua conta.',
  newPassword: 'Nova senha',
  confirmPassword: 'Confirmar senha',
  resetPassword: 'Redefinir senha',
  saving: 'Salvando...',

  // Step 4
  step4Title: 'Senha redefinida!',
  step4Subtitle: 'Sua senha foi alterada com sucesso.',
  goToLogin: 'Ir para o login',

  // Erros
  errorEmail: 'Digite seu e-mail',
  errorSendEmail: 'Erro ao enviar e-mail. Tente novamente.',
  errorCode: 'Digite o código completo',
  errorInvalidCode: 'Código inválido ou expirado.',
  errorNewPassword: 'Digite a nova senha',
  errorPasswordMismatch: 'As senhas não coincidem',
  errorReset: 'Erro ao redefinir senha. Tente novamente.'
},
login: {
  heroTitle: 'Sua oficina.\nNo controle total.',
  heroDesc: 'Gerencie ordens de serviço, estoque e clientes em um único painel profissional.',
  statWorkshops: 'Oficinas ativas',
  statSatisfaction: 'Satisfação',
  statProductivity: 'Mais produtivo',
  cardTitle: 'Bem-vindo de volta',
  cardSubtitle: 'Entre na sua conta para continuar',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  passwordLabel: 'Senha',
  forgotPassword: 'Esqueceu a senha?',
  loginBtn: 'Entrar na plataforma',
  authenticating: 'Autenticando...',
  noAccount: 'Não tem uma conta?',
  createAccount: 'Criar conta gratuita',
  secureConnection: 'Conexão segura e criptografada',
  errorLogin: 'Email ou senha inválidos'
},
newServiceOrder: {
  title: 'Nova Ordem de Serviço',
  subtitle: 'Preencha os dados para registrar a entrada do veículo',
  osLabel: 'Nº da OS',

  // Seções
  vehicleSection: 'Dados do Veículo',
  clientSection: 'Dados do Cliente',
  workshopSection: 'Dados da Oficina',

  // Veículo
  plate: 'Placa do Veículo',
  platePlaceholder: 'ABC-1234',
  mileage: 'Quilometragem',
  mileagePlaceholder: 'Ex: 45000',

  // Cliente
  customerName: 'Nome do Cliente',
  customerNamePlaceholder: 'Digite o nome do cliente',
  phone: 'Telefone do Cliente',
  phonePlaceholder: '(00) 00000-0000',

  // Oficina
  employee: 'Funcionário Responsável',
  employeePlaceholder: 'Nome do funcionário',
  boxNumber: 'Número do Box',
  boxPlaceholder: 'Ex: 3',
  entryDate: 'Data de Entrada',

  // Botões
  cancel: 'Cancelar',
  register: 'Registrar Ordem',
  saving: 'Salvando...',

  // Validações
  errorPlate: 'Informe a placa do veículo',
  errorCustomer: 'Informe o nome do cliente',
  errorPhone: 'Informe o telefone do cliente',
  errorMileage: 'Informe a quilometragem',
  errorEmployee: 'Informe o funcionário responsável',
  errorBox: 'Informe o número do box',
  errorDate: 'Informe a data de entrada',
  errorSave: 'Erro ao registrar ordem. Tente novamente.'
},

  sidebar: {
    newService: 'Novo Serviço',
    allServices: 'Todos os Serviços',
    settings: 'Configurações',
    logout: 'Sair'
  },
  settings: {
    title: 'Configurações',
    subtitle: 'Gerencie as informações da sua conta e oficina',
    tabWorkshop: 'Oficina',
    tabAccount: 'Minha Conta',

    // Oficina
    workshopInfo: 'Informações da Oficina',
    workshopInfoSub: 'Dados cadastrais do seu negócio',
    workshopName: 'Nome da Oficina',
    workshopNamePlaceholder: 'Nome da oficina',
    cnpj: 'CNPJ',
    cnpjPlaceholder: '00.000.000/0000-00',
    phone: 'Telefone',
    phonePlaceholder: '(00) 00000-0000',
    address: 'Endereço',
    addressPlaceholder: 'Rua, número, bairro, cidade',

    // Usuário
    accountInfo: 'Minha Conta',
    accountInfoSub: 'Informações do seu usuário',
    email: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    accessType: 'Tipo de acesso',
    newPassword: 'Nova senha',
    newPasswordOptional: '(opcional)',
    confirmPassword: 'Confirmar nova senha',

    // Idioma
    language: 'Idioma',
    languageSub: 'Escolha o idioma da interface',
    langBrowser: 'Idioma do navegador',
    langPt: 'Português',
    langEn: 'Inglês',
    langEs: 'Espanhol',

    // Ações
    edit: 'Editar',
    save: 'Salvar alterações',
    saving: 'Salvando...',
    cancel: 'Cancelar',

    // Info rodapé
    workshopId: 'ID da Oficina',
    registeredAt: 'Cadastrada em',
    userId: 'ID do Usuário',

    // Estados
    loading: 'Carregando informações...',
    noWorkshop: 'Nenhuma oficina vinculada',
    noWorkshopSub: 'Sua conta não está vinculada a uma oficina.',

    // Erros
    errorSave: 'Erro ao salvar. Tente novamente.',
    passwordMismatch: 'As senhas não coincidem'
  }
}