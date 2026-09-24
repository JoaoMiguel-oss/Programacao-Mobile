import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('scholar.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS alunos (
      id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      data_nascimento TEXT NOT NULL,
      email TEXT
    );
  `);

  const count = db.getFirstSync('SELECT COUNT(*) as count FROM alunos');
  if (count.count === 0) {
    db.runSync(
      'INSERT INTO alunos (nome, cpf, data_nascimento, email) VALUES (?, ?, ?, ?)',
      ['João Silva', '12345678901', '2000-01-15', 'joao@email.com']
    );
    db.runSync(
      'INSERT INTO alunos (nome, cpf, data_nascimento, email) VALUES (?, ?, ?, ?)',
      ['Maria Santos', '98765432109', '1999-05-22', 'maria@email.com']
    );
    console.log('Dados de exemplo inseridos no banco local');
  }
}

export function buscarAlunosLocal() {
  return db.getAllSync('SELECT * FROM alunos ORDER BY nome ASC');
}

export function cadastrarAlunoLocal(aluno) {
  const result = db.runSync(
    'INSERT INTO alunos (nome, cpf, data_nascimento, email) VALUES (?, ?, ?, ?)',
    [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.email || null]
  );
  return { id_aluno: result.lastInsertRowId, ...aluno };
}

export function editarAlunoLocal(aluno) {
  db.runSync(
    'UPDATE alunos SET nome = ?, cpf = ?, data_nascimento = ?, email = ? WHERE id_aluno = ?',
    [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.email || null, aluno.id_aluno]
  );
  return aluno;
}

export function deletarAlunoLocal(id) {
  db.runSync('DELETE FROM alunos WHERE id_aluno = ?', [id]);
}