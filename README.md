# Sistema Omnichannel - Clínica Médica
## Versão HTML/CSS/JavaScript Pura

Versão standalone do sistema omnichannel desenvolvida com HTML5, CSS3 e JavaScript vanilla, sem dependências externas.

### 📁 Estrutura de Arquivos

```
clinica-omnichannel-html/
├── index.html                    # Página inicial/landing page
├── css/
│   └── style.css                # Estilos globais do sistema
├── js/
│   ├── conexao.js              # Classe de conexão com API
│   └── utils.js                # Funções auxiliares
└── pages/
    ├── login.html              # Página de login
    ├── role-selection.html      # Seleção de perfil
    ├── patient-dashboard.html   # Painel do paciente
    ├── attendant-dashboard.html # Painel do atendente
    └── manager-dashboard.html   # Painel do gerente
```

### 🚀 Como Usar

#### 1. Abrir Localmente
Simplesmente abra o arquivo `index.html` em um navegador moderno:
```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

#### 2. Usar com Servidor Local (Recomendado)
Para melhor funcionamento, use um servidor local:

**Python 3:**
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
# Acesse: http://localhost:8000
```

**Node.js (http-server):**
```bash
npx http-server
# Acesse: http://localhost:8080
```

**PHP:**
```bash
php -S localhost:8000
# Acesse: http://localhost:8000
```

### 🔐 Autenticação

O sistema usa autenticação simulada com localStorage. Para testar:

**Credenciais de Teste:**
- Email: qualquer email válido
- Senha: qualquer senha

**Dados Armazenados Localmente:**
- `token`: Token de autenticação
- `user`: Dados do usuário
- `perfil_selecionado`: Perfil ativo

### 📄 Páginas Disponíveis

#### 1. **Landing Page** (`index.html`)
- Apresentação do sistema
- Recursos principais
- Call-to-action para login

#### 2. **Login** (`pages/login.html`)
- Formulário de autenticação
- Validação de email
- Redirecionamento automático

#### 3. **Seleção de Perfil** (`pages/role-selection.html`)
- Escolha entre Paciente, Atendente ou Gerente
- Descrição de funcionalidades por perfil
- Redirecionamento para painel correspondente

#### 4. **Painel do Paciente** (`pages/patient-dashboard.html`)
- Iniciar novas conversas
- Visualizar conversas ativas
- Selecionar canal de comunicação
- Modal para nova conversa

#### 5. **Painel do Atendente** (`pages/attendant-dashboard.html`)
- Caixa de entrada unificada
- Fila de espera
- Interface de chat
- Envio de mensagens

#### 6. **Painel do Gerente** (`pages/manager-dashboard.html`)
- Dashboard com métricas
- Tabela de conversas em tempo real
- Desempenho de atendentes
- Relatórios

### 🔌 Arquivo de Conexão (`js/conexao.js`)

Classe `ConexaoDB` que fornece métodos para comunicação com API:

**Métodos Principais:**
```javascript
// Autenticação
db.login(email, senha)
db.logout()
db.getUsuarioAtual()

// Conversas
db.listarMinhasConversas()
db.listarTodasConversas()
db.obterConversa(conversationId)
db.criarConversa(pacienteId, canalId, assunto, prioridade)
db.atualizarStatusConversa(conversationId, novoStatus)

// Mensagens
db.enviarMensagem(conversationId, conteudo, tipo)
db.obterMensagens(conversationId)

// Canais
db.listarCanais()

// Métricas
db.obterDashboard()
db.obterMetricasAtendente(atendanteId)
```

**Uso:**
```javascript
// Fazer login
const resultado = await db.login('usuario@email.com', 'senha');

// Listar conversas
const conversas = await db.listarMinhasConversas();

// Enviar mensagem
await db.enviarMensagem(1, 'Olá, como posso ajudar?', 'text');
```

### 🛠️ Funções Auxiliares (`js/utils.js`)

Conjunto de funções utilitárias:

```javascript
// Notificações
mostrarNotificacao(mensagem, tipo)

// Formatação
formatarData(data)
formatarHora(data)
formatarTelefone(telefone)

// Validação
validarEmail(email)
validarTelefone(telefone)

// UI
abrirModal(modalId)
fecharModal(modalId)
mostrarSpinner(elementId)

// Utilitários
copiarParaClipboard(texto)
estaAutenticado()
redirecionarParaLogin()
```

### 🎨 Customização

#### Cores
Edite as variáveis CSS em `css/style.css`:
```css
:root {
  --primary: #2563eb;
  --secondary: #10b981;
  --danger: #ef4444;
  /* ... mais cores ... */
}
```

#### Fontes
Modifique a família de fontes em `css/style.css`:
```css
html, body {
  font-family: 'Sua Fonte', sans-serif;
}
```

#### Temas
Adicione novos temas criando novas classes CSS:
```css
.theme-dark {
  --primary: #1e40af;
  --gray-50: #1f2937;
  /* ... */
}
```

### 🔗 Integração com Backend

Para conectar com um backend real, modifique `js/conexao.js`:

```javascript
const API_BASE_URL = 'http://seu-backend.com/api';
```

E implemente os métodos para fazer requisições reais:
```javascript
async login(email, senha) {
  const data = await this.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
  // ... resto da implementação
}
```

### 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (até 767px)

### 🌐 Navegadores Suportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### 💾 Armazenamento Local

O sistema usa `localStorage` para armazenar:
- Token de autenticação
- Dados do usuário
- Perfil selecionado

**Limpar dados:**
```javascript
localStorage.clear();
```

### 🔒 Segurança

**Notas Importantes:**
- Este é um protótipo/demonstração
- Em produção, use HTTPS
- Nunca armazene senhas em localStorage
- Implemente validação no backend
- Use tokens JWT com expiração

### 🐛 Troubleshooting

**Problema: Página em branco**
- Verifique se os arquivos CSS e JS estão no caminho correto
- Abra o console do navegador (F12) para ver erros

**Problema: Estilos não carregam**
- Certifique-se de usar um servidor local
- Limpe o cache do navegador (Ctrl+Shift+Delete)

**Problema: Autenticação não funciona**
- Verifique se localStorage está habilitado
- Abra o DevTools e veja a aba Application

### 📝 Licença

Sistema desenvolvido para uso educacional e comercial.

### 🤝 Suporte

Para dúvidas ou sugestões, consulte a documentação completa em `DOCUMENTACAO.md`.

---

**Versão:** 1.0.0  
**Data:** Novembro 2025  
**Desenvolvido com:** HTML5, CSS3, JavaScript Vanilla
