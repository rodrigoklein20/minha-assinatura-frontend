export const translations = {
  // ===== AUTH =====
  auth: {
    login: {
      title: 'Minha Assinatura',
      subtitle: 'Faça login em sua conta',
      email: 'Email',
      password: 'Senha',
      button: 'Entrar',
      loading: 'Entrando...',
      noAccount: 'Não tem uma conta?',
      signup: 'Cadastre-se',
    },
    signup: {
      title: 'Crie sua conta',
      subtitle: 'Comece sua jornada como profissional',
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      phone: 'Telefone',
      storeName: 'Nome da Loja',
      storeLink: 'URL da Loja',
      button: 'Cadastrar',
      loading: 'Cadastrando...',
      hasAccount: 'Já tem uma conta?',
      login: 'Faça login',
      required: '(obrigatório)',
      optional: '(opcional)',
    },
  },

  // ===== VALIDATION ERRORS =====
  validation: {
    emailRequired: 'Email é obrigatório',
    emailInvalid: 'Email inválido',
    passwordRequired: 'Senha é obrigatória',
    passwordMinLength: 'A senha deve ter no mínimo 6 caracteres',
    nameRequired: 'Nome é obrigatório',
    storeNameRequired: 'Nome da loja é obrigatório',
    storeLinkRequired: 'URL da loja é obrigatória',
    storeLinkInvalid: 'URL da loja deve conter apenas letras, números, hífen e underscore',
    phoneInvalid: 'Telefone inválido',
    requiredFields: 'Preencha todos os campos obrigatórios',
  },

  // ===== API ERROR RESPONSES =====
  errors: {
    // HTTP Status Codes
    '400': 'Requisição inválida. Verifique os dados enviados.',
    '401': 'Email ou senha inválidos.',
    '403': 'Você não tem permissão para acessar este recurso.',
    '404': 'Recurso não encontrado.',
    '500': 'Erro no servidor. Tente novamente mais tarde.',

    // Specific Error Codes
    INVALID_CREDENTIAL: 'Email ou senha inválidos.',
    INVALID_REQUEST: 'Requisição inválida. Verifique os dados.',
    INVALID_FORMAT: 'Formato de dados inválido.',
    INVALID_PARAMETER: 'Parâmetro inválido.',
    RESOURCE_NOT_FOUND: 'Recurso não encontrado.',
    DATABASE_ERROR: 'Erro ao acessar o banco de dados. Tente novamente.',
    INTERNAL_ERROR: 'Erro interno do servidor. Tente novamente.',
    UNAUTHORIZED: 'Você não está autenticado.',
    FORBIDDEN: 'Você não tem permissão para acessar este recurso.',

    // Fallback
    DEFAULT: 'Ocorreu um erro. Tente novamente mais tarde.',
    UNKNOWN: 'Erro desconhecido. Tente novamente.',
  },

  // ===== SUCCESS MESSAGES =====
  success: {
    loginSuccess: 'Login realizado com sucesso!',
    signupSuccess: 'Cadastro realizado com sucesso!',
  },
} as const
