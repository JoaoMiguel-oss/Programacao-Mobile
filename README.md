# APP_SCHOLAR — Sistema Acadêmico Escolar

Repositório focado no aplicativo escolar mobile **App Scholar**, atividade do curso de
Desenvolvimento de Sistemas.

O projeto é dividido em duas partes:

| Pasta | Descrição |
| --- | --- |
| `bd-scholarregular/` | App mobile (React Native + Expo) |
| `app_scholar_api/` | API REST em PHP que conversa com o banco MySQL |

## Tecnologias utilizadas

### App mobile

- **JavaScript** — linguagem principal do app
- **React Native 0.81** — framework de interface multiplataforma (Android/iOS/Web)
- **Expo SDK 54** — ambiente de execução, build e hot reload (`expo start`)
- **React 19.1** — biblioteca base do React Native
- **React Native Paper** — componentes de UI
- **@expo/vector-icons** — ícones MaterialCommunityIcons
- **React Navigation implícito / máquina de estados própria** — a navegação entre telas é
  feita por `useState` dentro de `App.js`, sem biblioteca de rotas

### Backend

- **PHP** — endpoints REST em `app_scholar_api/`
- **MySQL / MariaDB** — banco de dados `escola2`
- **PDO** e **mysqli** — conexão com o banco (`conexao.php` usa PDO, os endpoints de
  escrita usam mysqli)
- **Cloudflare Workers** — hospedagem da API em `https://api-scholar.migueljm76.workers.dev`
- **CORS** — liberado via `cors.php` e headers manuais para permitir chamadas do app

### Versionamento

- **Git / GitHub** — repositório `JoaoMiguel-oss/Programacao-Mobile`

## Como o projeto funciona

### 1. Estrutura de telas

O `App.js` funciona como um roteador manual. Ele guarda o estado da tela atual
(`HOME`, `CONSULTA`, `INSERCAO`, `EDICAO`) e renderiza apenas a tela correspondente,
passando callbacks de navegação (`onNavigate`, `onSalvarSucesso`, `onVoltar`).

```
App.js
 ├── HomeScreen.js      -> grid com 10 módulos (Alunos, Professores, Turmas, ...)
 ├── ConsultaScreen.js  -> lista registros vindos da API + pull to refresh
 ├── InsercaoScreen.js  -> formulário de cadastro com validação de campos
 ├── EdicaoScreen.js    -> formulário de edição de um aluno
 └── SobreScreen.js     -> informações do app (não ligada ao fluxo principal)
```

### 2. Módulos

A `HomeScreen` exibe os 10 módulos do sistema: Alunos, Professores, Turmas, Cursos,
Disciplinas, Matrículas, Responsáveis, Avaliações, Coordenadores e Boletins. Ao tocar em
um cartão, o app navega para `ConsultaScreen` passando o nome do módulo. Na prática, a
listagem carregada hoje é sempre a de **alunos** — os demais módulos ainda não têm
endpoints próprios.

### 3. Comunicação com a API

Toda a comunicação passa por `screens/api.js`:

```js
export const API_URL = 'https://api-scholar.migueljm76.workers.dev';
```

O módulo centraliza o `fetch` em uma função `request()` que cuida de headers JSON,
parse da resposta, tratamento de resposta vazia e conversão de erros de rede em
mensagens amigáveis. Depois expõe métodos como `listarAlunos()` e `buscarAluno(id)`.

Status atual dos métodos:

- `listarAlunos()` → `GET /alunos` (funcional)
- `buscarAluno(id)` → busca na lista e filtra localmente
- `cadastrarAluno()`, `atualizarAluno()`, `deletarAluno()` → ainda retornam erro
  informando que o endpoint correspondente precisa ser implementado no Worker

### 4. Fluxo de dados

1. Usuário abre o app e escolhe um módulo na `HomeScreen`.
2. `ConsultaScreen` chama `api.listarAlunos()` no `useEffect`.
3. A API (`app_scholar_api/alunos.php`) conecta no MySQL via PDO, executa o `SELECT`
   dos alunos ativos e devolve JSON.
4. O app exibe os registros em cards com botões de editar e excluir.
5. Editar abre `EdicaoScreen` com o aluno carregado; Cadastrar abre `InsercaoScreen`,
   que valida nome, CPF, data (`AAAA-MM-DD`) e e-mail antes de enviar.
6. Após salvar, o app volta para a consulta e recarrega a lista.

### 5. Tema visual

`styles/theme.js` centraliza as cores e os estilos globais (azul marinho como cor
primária, fundo cinza claro, cards brancos), reaproveitados por todas as telas.

## Como utilizar

### App mobile

```bash
cd bd-scholarregular
npm install
npm start        # abre o Expo Dev Server
npm run android  # emulador/dispositivo Android
npm run ios      # simulador iOS
npm run web      # navegador
```

Escaneie o QR code com o app **Expo Go** para rodar no celular.

### API PHP

1. Crie o banco MySQL `escola2` e ajuste as credenciais em `app_scholar_api/conexao.php`.
2. Suba a pasta `app_scholar_api/` em um servidor com PHP (XAMPP, WAMP, etc.).
3. Valide a conexão acessando `teste_conexao.php`.
4. Publique os endpoints em um Cloudflare Worker e atualize `API_URL` em
   `bd-scholarregular/screens/api.js`.