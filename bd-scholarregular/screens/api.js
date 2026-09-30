export const API_URL = 'https://api-scholar.migueljm76.workers.dev';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const text = await response.text();
    
    if (!text) {
      throw new Error('Resposta vazia do servidor');
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Resposta inválida: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(data.erro || data.mensagem || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Network')) {
      throw new Error('Erro de conexão. Verifique a internet e a API.');
    }
    throw error;
  }
}

export const api = {
  async listarAlunos() {
    return request('/alunos');
  },

  // Estas funções NÃO funcionam na API atual - precisam ser implementadas no Worker
  async cadastrarAluno(dados) {
    throw new Error('API não suporta cadastro. Implemente POST /alunos no Cloudflare Worker.');
  },

  async buscarAluno(id) {
    // API não suporta busca por ID, filtramos localmente
    const todos = await this.listarAlunos();
    return todos.find(a => a.id_aluno === id || a.id_aluno === parseInt(id));
  },

  async atualizarAluno(id, dados) {
    throw new Error('API não suporta atualização. Implemente PUT /alunos/:id no Cloudflare Worker.');
  },

  async deletarAluno(id) {
    throw new Error('API não suporta exclusão. Implemente DELETE /alunos/:id no Cloudflare Worker.');
  },
};