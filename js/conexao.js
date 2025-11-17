/**
 * Arquivo de Conexão com Banco de Dados
 * Sistema Omnichannel - Clínica Médica
 */

// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Classe para gerenciar conexões com o servidor
class ConexaoDB {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token') || null;
  }

  /**
   * Realiza uma requisição HTTP genérica
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  /**
   * Autenticação - Login
   */
  async login(email, senha) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha })
    });

    if (data.token) {
      this.token = data.token;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  /**
   * Autenticação - Logout
   */
  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Obter usuário atual
   */
  getUsuarioAtual() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * CONVERSAS - Listar conversas do atendente
   */
  async listarMinhasConversas() {
    return this.request('/conversations/mine', { method: 'GET' });
  }

  /**
   * CONVERSAS - Listar todas as conversas (gerente)
   */
  async listarTodasConversas() {
    return this.request('/conversations/all', { method: 'GET' });
  }

  /**
   * CONVERSAS - Obter conversa por ID
   */
  async obterConversa(conversationId) {
    return this.request(`/conversations/${conversationId}`, { method: 'GET' });
  }

  /**
   * CONVERSAS - Criar nova conversa
   */
  async criarConversa(pacienteId, canalId, assunto, prioridade = 'medium') {
    return this.request('/conversations', {
      method: 'POST',
      body: JSON.stringify({
        patientId: pacienteId,
        channelId: canalId,
        subject: assunto,
        priority: prioridade
      })
    });
  }

  /**
   * CONVERSAS - Atualizar status
   */
  async atualizarStatusConversa(conversationId, novoStatus) {
    return this.request(`/conversations/${conversationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: novoStatus })
    });
  }

  /**
   * CONVERSAS - Atribuir conversa
   */
  async atribuirConversa(conversationId, atendanteId) {
    return this.request(`/conversations/${conversationId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ attendantId: atendanteId })
    });
  }

  /**
   * MENSAGENS - Enviar mensagem
   */
  async enviarMensagem(conversationId, conteudo, tipo = 'text') {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify({
        conversationId,
        content: conteudo,
        messageType: tipo,
        senderType: 'attendant'
      })
    });
  }

  /**
   * MENSAGENS - Obter mensagens da conversa
   */
  async obterMensagens(conversationId) {
    return this.request(`/messages/${conversationId}`, { method: 'GET' });
  }

  /**
   * MENSAGENS - Marcar como lidas
   */
  async marcarMensagensComoLidas(conversationId) {
    return this.request(`/messages/${conversationId}/read`, { method: 'PUT' });
  }

  /**
   * CANAIS - Listar canais
   */
  async listarCanais() {
    return this.request('/channels', { method: 'GET' });
  }

  /**
   * RESPOSTAS RÁPIDAS - Listar
   */
  async listarRespostasRapidas() {
    return this.request('/quick-replies', { method: 'GET' });
  }

  /**
   * RESPOSTAS RÁPIDAS - Criar
   */
  async criarRespostaRapida(titulo, conteudo, categoria) {
    return this.request('/quick-replies', {
      method: 'POST',
      body: JSON.stringify({ title: titulo, content: conteudo, category: categoria })
    });
  }

  /**
   * MÉTRICAS - Dashboard
   */
  async obterDashboard() {
    return this.request('/metrics/dashboard', { method: 'GET' });
  }

  /**
   * MÉTRICAS - Desempenho por atendente
   */
  async obterMetricasAtendente(atendanteId) {
    return this.request(`/metrics/attendant/${atendanteId}`, { method: 'GET' });
  }

  /**
   * MÉTRICAS - Todas as métricas
   */
  async obterTodasMetricas() {
    return this.request('/metrics/all', { method: 'GET' });
  }

  /**
   * AGENDAMENTOS - Criar
   */
  async criarAgendamento(pacienteId, medico, especialidade, data) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify({
        patientId: pacienteId,
        doctorName: medico,
        specialty: especialidade,
        scheduledAt: data
      })
    });
  }

  /**
   * AGENDAMENTOS - Listar por paciente
   */
  async listarAgendamentos(pacienteId) {
    return this.request(`/appointments/patient/${pacienteId}`, { method: 'GET' });
  }

  /**
   * NOTIFICAÇÕES - Obter
   */
  async obterNotificacoes() {
    return this.request('/notifications', { method: 'GET' });
  }

  /**
   * NOTIFICAÇÕES - Marcar como lida
   */
  async marcarNotificacaoComoLida(notificacaoId) {
    return this.request(`/notifications/${notificacaoId}/read`, { method: 'PUT' });
  }
}

// Instância global da conexão
const db = new ConexaoDB();

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConexaoDB;
}
