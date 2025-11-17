/**
 * Funções Auxiliares
 * Sistema Omnichannel - Clínica Médica
 */

/**
 * Mostrar notificação
 */
function mostrarNotificacao(mensagem, tipo = 'info') {
  const container = document.getElementById('notifications') || criarContainerNotificacoes();
  
  const alert = document.createElement('div');
  alert.className = `alert alert-${tipo}`;
  alert.textContent = mensagem;
  
  container.appendChild(alert);
  
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

/**
 * Criar container de notificações
 */
function criarContainerNotificacoes() {
  const container = document.createElement('div');
  container.id = 'notifications';
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';
  container.style.maxWidth = '400px';
  document.body.appendChild(container);
  return container;
}

/**
 * Formatar data
 */
function formatarData(data) {
  if (!data) return '';
  
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, '0');
  const minuto = String(d.getMinutes()).padStart(2, '0');
  
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

/**
 * Formatar data curta
 */
function formatarDataCurta(data) {
  if (!data) return '';
  
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formatar hora
 */
function formatarHora(data) {
  if (!data) return '';
  
  const d = new Date(data);
  const hora = String(d.getHours()).padStart(2, '0');
  const minuto = String(d.getMinutes()).padStart(2, '0');
  
  return `${hora}:${minuto}`;
}

/**
 * Obter ícone do canal
 */
function obterIconeCanal(tipo) {
  const icones = {
    whatsapp: '📱',
    instagram: '📷',
    facebook: '👥',
    email: '📧',
    webchat: '💬'
  };
  return icones[tipo] || '💬';
}

/**
 * Obter cor do status
 */
function obterCorStatus(status) {
  const cores = {
    waiting: '#f59e0b',
    in_progress: '#3b82f6',
    resolved: '#10b981',
    closed: '#6b7280'
  };
  return cores[status] || '#6b7280';
}

/**
 * Obter label do status
 */
function obterLabelStatus(status) {
  const labels = {
    waiting: 'Aguardando',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido',
    closed: 'Fechado'
  };
  return labels[status] || status;
}

/**
 * Obter label da prioridade
 */
function obterLabelPrioridade(prioridade) {
  const labels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    urgent: 'Urgente'
  };
  return labels[prioridade] || prioridade;
}

/**
 * Validar email
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar telefone
 */
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

/**
 * Formatar telefone
 */
function formatarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  return telefone;
}

/**
 * Copiar para clipboard
 */
function copiarParaClipboard(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarNotificacao('Copiado para a área de transferência!', 'success');
  }).catch(() => {
    mostrarNotificacao('Erro ao copiar', 'danger');
  });
}

/**
 * Abrir modal
 */
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Fechar modal
 */
function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Mostrar spinner
 */
function mostrarSpinner(elementId) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.innerHTML = '<div class="spinner"></div>';
  }
}

/**
 * Limpar elemento
 */
function limparElemento(elementId) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.innerHTML = '';
  }
}

/**
 * Adicionar classe
 */
function adicionarClasse(elementId, classe) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.classList.add(classe);
  }
}

/**
 * Remover classe
 */
function removerClasse(elementId, classe) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.classList.remove(classe);
  }
}

/**
 * Verificar se está autenticado
 */
function estaAutenticado() {
  return !!localStorage.getItem('token');
}

/**
 * Redirecionar para login
 */
function redirecionarParaLogin() {
  window.location.href = '/pages/login.html';
}

/**
 * Obter parâmetro da URL
 */
function obterParametroURL(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

/**
 * Criar elemento
 */
function criarElemento(tag, classe = '', texto = '') {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

/**
 * Formatar número como moeda
 */
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

/**
 * Calcular tempo decorrido
 */
function calcularTempoDecorrido(dataInicio, dataFim) {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const diferenca = Math.floor((fim - inicio) / 1000);
  
  if (diferenca < 60) return `${diferenca}s`;
  if (diferenca < 3600) return `${Math.floor(diferenca / 60)}min`;
  if (diferenca < 86400) return `${Math.floor(diferenca / 3600)}h`;
  return `${Math.floor(diferenca / 86400)}d`;
}

/**
 * Debounce
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Verificar conexão com internet
 */
function verificarConexao() {
  return navigator.onLine;
}

/**
 * Aguardar
 */
function aguardar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
