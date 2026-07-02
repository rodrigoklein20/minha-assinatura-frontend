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
    planCreated: 'Plano criado com sucesso!',
    planUpdated: 'Plano atualizado com sucesso!',
    planDeleted: 'Plano deletado com sucesso!',
    subscriberCreated: 'Assinante criado com sucesso!',
    subscriberUpdated: 'Assinante atualizado com sucesso!',
    subscriberDeleted: 'Assinante deletado com sucesso!',
    subscriptionCreated: 'Assinatura criada com sucesso!',
    subscriptionCancelled: 'Assinatura cancelada com sucesso!',
    paymentCreated: 'Pagamento registrado com sucesso!',
    paymentUpdated: 'Status do pagamento atualizado com sucesso!',
  },

  // ===== DASHBOARD =====
  dashboard: {
    title: 'Dashboard',
    metrics: {
      activePlans: 'Planos Ativos',
      totalSubscribers: 'Assinantes',
      activeSubscriptions: 'Assinaturas Ativas',
      totalRevenue: 'Receita Total',
    },
    recentSubscriptions: 'Assinaturas Recentes',
    noData: 'Nenhum dado disponível',
  },

  // ===== PLANS =====
  plans: {
    title: 'Planos',
    description: 'Gerencie seus planos de assinatura',
    button: 'Novo Plano',
    name: 'Nome do Plano',
    slug: 'URL Amigável',
    description: 'Descrição',
    price: 'Preço',
    billingCycle: 'Ciclo de Faturamento',
    image: 'Imagem',
    active: 'Ativo',
    actions: 'Ações',
    edit: 'Editar',
    delete: 'Deletar',
    deleteConfirm: 'Tem certeza que deseja deletar este plano?',
    modal: {
      create: 'Novo Plano',
      edit: 'Editar Plano',
      save: 'Salvar',
      cancel: 'Cancelar',
    },
    monthly: 'Mensal',
    quarterly: 'Trimestral',
    annually: 'Anual',
  },

  // ===== SUBSCRIBERS =====
  subscribers: {
    title: 'Assinantes',
    description: 'Gerencie seus clientes',
    button: 'Novo Assinante',
    name: 'Nome',
    email: 'Email',
    phone: 'Telefone',
    subscriptions: 'Assinaturas',
    actions: 'Ações',
    edit: 'Editar',
    delete: 'Deletar',
    deleteConfirm: 'Tem certeza que deseja deletar este assinante?',
    viewSubscriptions: 'Ver Assinaturas',
    modal: {
      create: 'Novo Assinante',
      edit: 'Editar Assinante',
      save: 'Salvar',
      cancel: 'Cancelar',
    },
  },

  // ===== SUBSCRIPTIONS =====
  subscriptions: {
    title: 'Assinaturas',
    description: 'Gerencie as assinaturas ativas',
    button: 'Nova Assinatura',
    plan: 'Plano',
    subscriber: 'Assinante',
    startDate: 'Data de Início',
    nextBillingDate: 'Próximo Ciclo',
    status: 'Status',
    actions: 'Ações',
    active: 'Ativa',
    cancelled: 'Cancelada',
    pending: 'Pendente',
    cancel: 'Cancelar',
    view: 'Visualizar',
    cancelConfirm: 'Tem certeza que deseja cancelar esta assinatura?',
    cancelReason: 'Motivo do cancelamento',
    modal: {
      create: 'Nova Assinatura',
      cancel: 'Cancelar Assinatura',
      save: 'Salvar',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
  },

  // ===== PAYMENTS =====
  payments: {
    title: 'Pagamentos',
    description: 'Controle seus pagamentos',
    button: 'Registrar Pagamento',
    subscription: 'Assinatura',
    amount: 'Valor',
    status: 'Status',
    date: 'Data',
    transactionId: 'ID da Transação',
    actions: 'Ações',
    paid: 'Pago',
    failed: 'Falhou',
    refunded: 'Reembolsado',
    pending: 'Pendente',
    edit: 'Editar',
    deleteConfirm: 'Tem certeza que deseja deletar este pagamento?',
    modal: {
      create: 'Registrar Pagamento',
      updateStatus: 'Atualizar Status',
      save: 'Salvar',
      update: 'Atualizar',
      cancel: 'Cancelar',
    },
  },

  // ===== COMMON ACTIONS =====
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Deletar',
    edit: 'Editar',
    create: 'Criar',
    close: 'Fechar',
    loading: 'Carregando...',
    search: 'Buscar',
    filter: 'Filtrar',
    noResults: 'Nenhum resultado encontrado',
    confirmDelete: 'Confirmar exclusão',
    selectOption: 'Selecione uma opção',
  },
} as const
