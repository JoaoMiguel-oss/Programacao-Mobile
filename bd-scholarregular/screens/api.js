import { buscarAlunosLocal, cadastrarAlunoLocal, editarAlunoLocal, initDatabase } from './database';

initDatabase();

const API_URL = 'https://api-scholar.migueljm76.workers.dev';
const USE_REMOTE_API = true;

export async function buscarAlunos() {
  try {
    const locais = buscarAlunosLocal();
    if (locais.length > 0 || !USE_REMOTE_API) {
      return locais;
    }
    const resposta = await fetch(API_URL);
    const remotos = await resposta.json();
    return remotos;
  } catch (erro) {
    console.error('Erro ao buscar alunos:', erro);
    return buscarAlunosLocal();
  }
}

export async function cadastrarAluno(aluno) {
  try {
    const resultado = cadastrarAlunoLocal(aluno);
    if (USE_REMOTE_API) {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(aluno),
        });
      } catch (e) {
        console.warn('Falha ao sincronizar com API remota:', e);
      }
    }
    return resultado;
  } catch (erro) {
    console.error('Erro ao cadastrar:', erro);
    return { error: 'Falha ao cadastrar no banco local' };
  }
}

export async function editarAluno(aluno) {
  try {
    const resultado = editarAlunoLocal(aluno);
    if (USE_REMOTE_API) {
      try {
        await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(aluno),
        });
      } catch (e) {
        console.warn('Falha ao sincronizar com API remota:', e);
      }
    }
    return resultado;
  } catch (erro) {
    console.error('Erro ao editar:', erro);
    return { error: 'Falha ao editar no banco local' };
  }
}