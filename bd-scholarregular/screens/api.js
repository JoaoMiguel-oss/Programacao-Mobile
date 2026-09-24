export const API_UR = 'http://172.26.64.1/app_scholar_api';



const API_URL = 'https://api-scholar.migueljm76.workers.dev';

// Função para buscar todos os alunos (GET)
export async function getAlunos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro na requisição');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
  }
}

