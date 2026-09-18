-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/08/2026 às 16:28
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `escola2`
--
CREATE DATABASE IF NOT EXISTS `escola2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `escola2`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aluno`
--

INSERT INTO `aluno` (`id_aluno`, `nome`, `cpf`, `data_nascimento`, `email`, `id_endereco`) VALUES
(1, 'Lucas Souza', '11122233344', '2006-03-15', 'lucas@email.com', 1),
(2, 'Beatriz Martins', '22233344455', '2007-08-22', 'bea@email.com', 2),
(3, 'Rafael Andrade', '33344455566', '2006-11-01', 'rafael@email.com', 3),
(4, 'Isabela Rocha', '44455566677', '2007-05-30', 'isa@email.com', 4),
(5, 'Gabriel Nascimento', '55566677788', '2006-07-18', 'gabriel@email.com', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno_responsavel`
--

CREATE TABLE `aluno_responsavel` (
  `id_aluno` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `parentesco` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aluno_responsavel`
--

INSERT INTO `aluno_responsavel` (`id_aluno`, `id_responsavel`, `parentesco`) VALUES
(1, 1, 'Mãe'),
(2, 2, 'Pai'),
(3, 3, 'Mãe'),
(4, 4, 'Pai'),
(5, 5, 'Responsável Legal');

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id_avaliacao` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `id_disciplina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `avaliacao`
--

INSERT INTO `avaliacao` (`id_avaliacao`, `nome`, `id_disciplina`) VALUES
(1, 'Prova Bimestral 1', 1),
(2, 'Prova Bimestral 2', 1),
(3, 'Trabalho em Grupo', 2),
(4, 'Prova Bimestral 1', 3),
(5, 'Apresentação Oral', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairro`
--

CREATE TABLE `bairro` (
  `id_bairro` int(11) NOT NULL,
  `nome_bairro` varchar(100) NOT NULL,
  `id_cidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bairro`
--

INSERT INTO `bairro` (`id_bairro`, `nome_bairro`, `id_cidade`) VALUES
(1, 'Centro', 1),
(2, 'Vila Industrial', 1),
(3, 'Jardim América', 2),
(4, 'Copacabana', 3),
(5, 'Savassi', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `boletim`
--

CREATE TABLE `boletim` (
  `id_boletim` int(11) NOT NULL,
  `id_frequencia` int(11) NOT NULL,
  `id_matricula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `boletim`
--

INSERT INTO `boletim` (`id_boletim`, `id_frequencia`, `id_matricula`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidade`
--

CREATE TABLE `cidade` (
  `id_cidade` int(11) NOT NULL,
  `Nome_cidade` varchar(100) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidade`
--

INSERT INTO `cidade` (`id_cidade`, `Nome_cidade`, `id_estado`) VALUES
(1, 'São José dos Campos', 1),
(2, 'Campinas', 1),
(3, 'Rio de Janeiro', 2),
(4, 'Belo Horizonte', 3),
(5, 'Curitiba', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador`
--

CREATE TABLE `coordenador` (
  `id_coordenador` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `coordenador`
--

INSERT INTO `coordenador` (`id_coordenador`, `nome`, `id_endereco`) VALUES
(1, 'Dra. Patrícia Mendes', 1),
(2, 'Dr. Henrique Alves', 2),
(3, 'Dra. Camila Torres', 3),
(4, 'Dr. Ricardo Gomes', 4),
(5, 'Dra. Simone Barbosa', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `duracao` int(11) NOT NULL,
  `id_coordenador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `curso`
--

INSERT INTO `curso` (`id_curso`, `nome`, `duracao`, `id_coordenador`) VALUES
(1, 'Técnico em Desenvolvimento de Sistemas', 3, 1),
(2, 'Técnico em Administração', 2, 2),
(3, 'Técnico em Enfermagem', 2, 3),
(4, 'Técnico em Design Gráfico', 2, 4),
(5, 'Ensino Médio Regular', 3, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `id_disciplina` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `Carga_horaria` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_professor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplina`
--

INSERT INTO `disciplina` (`id_disciplina`, `nome`, `Carga_horaria`, `id_curso`, `id_professor`) VALUES
(1, 'Algoritmos e Lógica de Programação', 80, 1, 1),
(2, 'Língua Portuguesa', 60, 5, 2),
(3, 'História Geral', 60, 5, 3),
(4, 'Biologia', 60, 5, 4),
(5, 'Educação Física', 40, 5, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina_turma`
--

CREATE TABLE `disciplina_turma` (
  `id_disciplina` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplina_turma`
--

INSERT INTO `disciplina_turma` (`id_disciplina`, `id_turma`) VALUES
(1, 1),
(2, 5),
(3, 5),
(4, 5),
(5, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `id_endereco` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `id_logradouro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id_endereco`, `numero`, `complemento`, `id_logradouro`) VALUES
(1, '100', NULL, 1),
(2, '250', 'Apto 12', 2),
(3, '33', 'Casa B', 3),
(4, '1500', NULL, 4),
(5, '78', 'Bloco C', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `nome_estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `estado`
--

INSERT INTO `estado` (`id_estado`, `nome_estado`) VALUES
(1, 'São Paulo'),
(2, 'Rio de Janeiro'),
(3, 'Minas Gerais'),
(4, 'Paraná'),
(5, 'Bahia');

-- --------------------------------------------------------

--
-- Estrutura para tabela `frequencia`
--

CREATE TABLE `frequencia` (
  `id_frequencia` int(11) NOT NULL,
  `percentual_frequencia` decimal(5,2) NOT NULL,
  `id_matricula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `frequencia`
--

INSERT INTO `frequencia` (`id_frequencia`, `percentual_frequencia`, `id_matricula`) VALUES
(1, 92.50, 1),
(2, 87.30, 2),
(3, 95.00, 3),
(4, 78.60, 4),
(5, 100.00, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `logradouro`
--

CREATE TABLE `logradouro` (
  `id_logradouro` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `id_bairro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `logradouro`
--

INSERT INTO `logradouro` (`id_logradouro`, `nome`, `id_bairro`) VALUES
(1, 'Rua das Flores', 1),
(2, 'Av. Brasil', 2),
(3, 'Rua Humberto de Campos', 3),
(4, 'Av. Atlântica', 4),
(5, 'Rua da Bahia', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `matricula`
--

CREATE TABLE `matricula` (
  `id_matricula` int(11) NOT NULL,
  `data_matricula` date NOT NULL,
  `id_aluno` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `matricula`
--

INSERT INTO `matricula` (`id_matricula`, `data_matricula`, `id_aluno`, `id_turma`) VALUES
(1, '2024-02-05', 1, 1),
(2, '2024-02-05', 2, 1),
(3, '2024-02-05', 3, 3),
(4, '2024-02-05', 4, 4),
(5, '2024-02-05', 5, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `nota`
--

CREATE TABLE `nota` (
  `id_nota` int(11) NOT NULL,
  `nota` decimal(4,2) NOT NULL,
  `media_final` decimal(4,2) DEFAULT NULL,
  `id_matricula` int(11) NOT NULL,
  `id_avaliacao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nota`
--

INSERT INTO `nota` (`id_nota`, `nota`, `media_final`, `id_matricula`, `id_avaliacao`) VALUES
(1, 8.50, 8.50, 1, 1),
(2, 7.00, 7.00, 2, 1),
(3, 9.00, 9.00, 1, 2),
(4, 6.50, 6.50, 3, 3),
(5, 10.00, 10.00, 4, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `id_professor` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `formacao` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professor`
--

INSERT INTO `professor` (`id_professor`, `nome`, `formacao`, `email`, `id_endereco`) VALUES
(1, 'Prof. André Vieira', 'Licenciatura em Matemática', 'andre@escola.com', 1),
(2, 'Profa. Juliana Pinto', 'Licenciatura em Português', 'juliana@escola.com', 2),
(3, 'Prof. Marcos Corrêa', 'Licenciatura em História', 'marcos@escola.com', 3),
(4, 'Profa. Larissa Nunes', 'Licenciatura em Ciências', 'larissa@escola.com', 4),
(5, 'Prof. Bruno Cardoso', 'Licenciatura em Ed. Física', 'bruno@escola.com', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsavel`
--

CREATE TABLE `responsavel` (
  `id_responsavel` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `responsavel`
--

INSERT INTO `responsavel` (`id_responsavel`, `nome`, `id_endereco`) VALUES
(1, 'Maria Oliveira', 1),
(2, 'João Santos', 2),
(3, 'Ana Lima', 3),
(4, 'Carlos Ferreira', 4),
(5, 'Fernanda Costa', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `turma`
--

CREATE TABLE `turma` (
  `id_turma` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `ano_letivo` char(4) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `turma`
--

INSERT INTO `turma` (`id_turma`, `nome`, `ano_letivo`, `id_curso`) VALUES
(1, '1DS-A', '2024', 1),
(2, '1DS-B', '2024', 1),
(3, '1ADM', '2024', 2),
(4, '1MED', '2024', 3),
(5, '1EM-A', '2024', 5);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_01_alunos_cursos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_01_alunos_cursos` (
`codigo_aluno` int(11)
,`nome_aluno` varchar(100)
,`codigo_matricula` int(11)
,`data_matricula` date
,`codigo_curso` int(11)
,`nome_curso` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_02_alunos_turmas_cursos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_02_alunos_turmas_cursos` (
`codigo_aluno` int(11)
,`aluno` varchar(100)
,`codigo_turma` int(11)
,`turma` varchar(50)
,`codigo_curso` int(11)
,`curso` varchar(100)
,`ano_letivo` char(4)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_03_disciplinas_professores`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_03_disciplinas_professores` (
`codigo_disciplina` int(11)
,`nome_disciplina` varchar(100)
,`carga_horaria` int(11)
,`codigo_professor` int(11)
,`nome_professor` varchar(100)
,`formacao` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_04_disciplinas_professores_cursos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_04_disciplinas_professores_cursos` (
`codigo_curso` int(11)
,`nome_curso` varchar(100)
,`codigo_disciplina` int(11)
,`nome_disciplina` varchar(100)
,`carga_horaria` int(11)
,`codigo_professor` int(11)
,`nome_professor` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_05_alunos_responsaveis`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_05_alunos_responsaveis` (
`codigo_aluno` int(11)
,`nome_aluno` varchar(100)
,`cpf_aluno` char(11)
,`codigo_responsavel` int(11)
,`nome_responsavel` varchar(100)
,`grau_parentesco` varchar(50)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_06_alunos_disciplinas_notas`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_06_alunos_disciplinas_notas` (
`codigo_aluno` int(11)
,`nome_aluno` varchar(100)
,`codigo_disciplina` int(11)
,`nome_disciplina` varchar(100)
,`codigo_nota` int(11)
,`nota` decimal(4,2)
,`media_final` decimal(4,2)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_07_alunos_turmas_disciplinas_professores`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_07_alunos_turmas_disciplinas_professores` (
`codigo_aluno` int(11)
,`aluno` varchar(100)
,`codigo_turma` int(11)
,`turma` varchar(50)
,`codigo_curso` int(11)
,`curso` varchar(100)
,`codigo_disciplina` int(11)
,`disciplina` varchar(100)
,`codigo_professor` int(11)
,`professor` varchar(100)
,`ano_letivo` char(4)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_08_desempenho_academico`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_08_desempenho_academico` (
`codigo_aluno` int(11)
,`aluno` varchar(100)
,`codigo_curso` int(11)
,`curso` varchar(100)
,`codigo_disciplina` int(11)
,`disciplina` varchar(100)
,`media_das_notas` decimal(8,6)
,`media_final` decimal(8,6)
,`frequencia` decimal(5,2)
,`situacao_final` varchar(10)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_09_situacao_matriculas`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_09_situacao_matriculas` (
`codigo_aluno` int(11)
,`aluno` varchar(100)
,`codigo_curso` int(11)
,`curso` varchar(100)
,`codigo_turma` int(11)
,`turma` varchar(50)
,`data_matricula` date
,`situacao_matricula` varchar(13)
,`ano_letivo` char(4)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_10_relatorio_academico_completo`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_10_relatorio_academico_completo` (
`codigo_aluno` int(11)
,`aluno` varchar(100)
,`codigo_curso` int(11)
,`curso` varchar(100)
,`codigo_turma` int(11)
,`turma` varchar(50)
,`ano_letivo` char(4)
,`codigo_disciplina` int(11)
,`disciplina` varchar(100)
,`codigo_professor` int(11)
,`professor` varchar(100)
,`nota` decimal(4,2)
,`media_final` decimal(4,2)
,`frequencia` decimal(5,2)
,`situacao_final` varchar(20)
);

-- --------------------------------------------------------

--
-- Estrutura para view `vw_01_alunos_cursos`
--
DROP TABLE IF EXISTS `vw_01_alunos_cursos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_01_alunos_cursos`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `nome_aluno`, `m`.`id_matricula` AS `codigo_matricula`, `m`.`data_matricula` AS `data_matricula`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `nome_curso` FROM (((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_02_alunos_turmas_cursos`
--
DROP TABLE IF EXISTS `vw_02_alunos_turmas_cursos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_02_alunos_turmas_cursos`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `aluno`, `t`.`id_turma` AS `codigo_turma`, `t`.`nome` AS `turma`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `curso`, `t`.`ano_letivo` AS `ano_letivo` FROM (((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_03_disciplinas_professores`
--
DROP TABLE IF EXISTS `vw_03_disciplinas_professores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_03_disciplinas_professores`  AS SELECT `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `nome_disciplina`, `d`.`Carga_horaria` AS `carga_horaria`, `p`.`id_professor` AS `codigo_professor`, `p`.`nome` AS `nome_professor`, `p`.`formacao` AS `formacao` FROM (`disciplina` `d` join `professor` `p` on(`d`.`id_professor` = `p`.`id_professor`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_04_disciplinas_professores_cursos`
--
DROP TABLE IF EXISTS `vw_04_disciplinas_professores_cursos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_04_disciplinas_professores_cursos`  AS SELECT `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `nome_curso`, `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `nome_disciplina`, `d`.`Carga_horaria` AS `carga_horaria`, `p`.`id_professor` AS `codigo_professor`, `p`.`nome` AS `nome_professor` FROM ((`disciplina` `d` join `curso` `c` on(`d`.`id_curso` = `c`.`id_curso`)) join `professor` `p` on(`d`.`id_professor` = `p`.`id_professor`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_05_alunos_responsaveis`
--
DROP TABLE IF EXISTS `vw_05_alunos_responsaveis`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_05_alunos_responsaveis`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `nome_aluno`, `a`.`cpf` AS `cpf_aluno`, `r`.`id_responsavel` AS `codigo_responsavel`, `r`.`nome` AS `nome_responsavel`, `ar`.`parentesco` AS `grau_parentesco` FROM ((`aluno` `a` join `aluno_responsavel` `ar` on(`a`.`id_aluno` = `ar`.`id_aluno`)) join `responsavel` `r` on(`ar`.`id_responsavel` = `r`.`id_responsavel`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_06_alunos_disciplinas_notas`
--
DROP TABLE IF EXISTS `vw_06_alunos_disciplinas_notas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_06_alunos_disciplinas_notas`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `nome_aluno`, `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `nome_disciplina`, `n`.`id_nota` AS `codigo_nota`, `n`.`nota` AS `nota`, `n`.`media_final` AS `media_final` FROM ((((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `nota` `n` on(`m`.`id_matricula` = `n`.`id_matricula`)) join `avaliacao` `av` on(`n`.`id_avaliacao` = `av`.`id_avaliacao`)) join `disciplina` `d` on(`av`.`id_disciplina` = `d`.`id_disciplina`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_07_alunos_turmas_disciplinas_professores`
--
DROP TABLE IF EXISTS `vw_07_alunos_turmas_disciplinas_professores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_07_alunos_turmas_disciplinas_professores`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `aluno`, `t`.`id_turma` AS `codigo_turma`, `t`.`nome` AS `turma`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `curso`, `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `disciplina`, `p`.`id_professor` AS `codigo_professor`, `p`.`nome` AS `professor`, `t`.`ano_letivo` AS `ano_letivo` FROM ((((((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) join `disciplina_turma` `dt` on(`t`.`id_turma` = `dt`.`id_turma`)) join `disciplina` `d` on(`dt`.`id_disciplina` = `d`.`id_disciplina`)) join `professor` `p` on(`d`.`id_professor` = `p`.`id_professor`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_08_desempenho_academico`
--
DROP TABLE IF EXISTS `vw_08_desempenho_academico`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_08_desempenho_academico`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `aluno`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `curso`, `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `disciplina`, avg(`n`.`nota`) AS `media_das_notas`, avg(`n`.`media_final`) AS `media_final`, `f`.`percentual_frequencia` AS `frequencia`, CASE WHEN avg(`n`.`media_final`) >= 6 AND `f`.`percentual_frequencia` >= 75 THEN 'Aprovado' WHEN avg(`n`.`media_final`) < 6 OR `f`.`percentual_frequencia` < 75 THEN 'Reprovado' ELSE 'Em análise' END AS `situacao_final` FROM (((((((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) join `nota` `n` on(`m`.`id_matricula` = `n`.`id_matricula`)) join `avaliacao` `av` on(`n`.`id_avaliacao` = `av`.`id_avaliacao`)) join `disciplina` `d` on(`av`.`id_disciplina` = `d`.`id_disciplina`)) join `frequencia` `f` on(`m`.`id_matricula` = `f`.`id_matricula`)) GROUP BY `a`.`id_aluno`, `a`.`nome`, `c`.`id_curso`, `c`.`nome`, `d`.`id_disciplina`, `d`.`nome`, `f`.`percentual_frequencia` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_09_situacao_matriculas`
--
DROP TABLE IF EXISTS `vw_09_situacao_matriculas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_09_situacao_matriculas`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `aluno`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `curso`, `t`.`id_turma` AS `codigo_turma`, `t`.`nome` AS `turma`, `m`.`data_matricula` AS `data_matricula`, CASE WHEN `m`.`id_matricula` is not null THEN 'Matriculado' ELSE 'Sem matrícula' END AS `situacao_matricula`, `t`.`ano_letivo` AS `ano_letivo` FROM (((`aluno` `a` left join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) left join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) left join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_10_relatorio_academico_completo`
--
DROP TABLE IF EXISTS `vw_10_relatorio_academico_completo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_10_relatorio_academico_completo`  AS SELECT `a`.`id_aluno` AS `codigo_aluno`, `a`.`nome` AS `aluno`, `c`.`id_curso` AS `codigo_curso`, `c`.`nome` AS `curso`, `t`.`id_turma` AS `codigo_turma`, `t`.`nome` AS `turma`, `t`.`ano_letivo` AS `ano_letivo`, `d`.`id_disciplina` AS `codigo_disciplina`, `d`.`nome` AS `disciplina`, `p`.`id_professor` AS `codigo_professor`, `p`.`nome` AS `professor`, `n`.`nota` AS `nota`, `n`.`media_final` AS `media_final`, `f`.`percentual_frequencia` AS `frequencia`, CASE WHEN `n`.`media_final` >= 6 AND `f`.`percentual_frequencia` >= 75 THEN 'Aprovado' WHEN `n`.`media_final` < 6 OR `f`.`percentual_frequencia` < 75 THEN 'Reprovado' WHEN `n`.`media_final` is null AND `f`.`percentual_frequencia` is null THEN 'Sem dados acadêmicos' ELSE 'Em análise' END AS `situacao_final` FROM (((((((((`aluno` `a` join `matricula` `m` on(`a`.`id_aluno` = `m`.`id_aluno`)) join `turma` `t` on(`m`.`id_turma` = `t`.`id_turma`)) join `curso` `c` on(`t`.`id_curso` = `c`.`id_curso`)) left join `disciplina_turma` `dt` on(`t`.`id_turma` = `dt`.`id_turma`)) left join `disciplina` `d` on(`dt`.`id_disciplina` = `d`.`id_disciplina`)) left join `professor` `p` on(`d`.`id_professor` = `p`.`id_professor`)) left join `avaliacao` `av` on(`d`.`id_disciplina` = `av`.`id_disciplina`)) left join `nota` `n` on(`m`.`id_matricula` = `n`.`id_matricula` and `av`.`id_avaliacao` = `n`.`id_avaliacao`)) left join `frequencia` `f` on(`m`.`id_matricula` = `f`.`id_matricula`)) ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id_aluno`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `id_endereco` (`id_endereco`);

--
-- Índices de tabela `aluno_responsavel`
--
ALTER TABLE `aluno_responsavel`
  ADD PRIMARY KEY (`id_aluno`,`id_responsavel`),
  ADD KEY `id_responsavel` (`id_responsavel`);

--
-- Índices de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `id_disciplina` (`id_disciplina`);

--
-- Índices de tabela `bairro`
--
ALTER TABLE `bairro`
  ADD PRIMARY KEY (`id_bairro`),
  ADD KEY `id_cidade` (`id_cidade`);

--
-- Índices de tabela `boletim`
--
ALTER TABLE `boletim`
  ADD PRIMARY KEY (`id_boletim`),
  ADD KEY `id_frequencia` (`id_frequencia`),
  ADD KEY `id_matricula` (`id_matricula`);

--
-- Índices de tabela `cidade`
--
ALTER TABLE `cidade`
  ADD PRIMARY KEY (`id_cidade`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Índices de tabela `coordenador`
--
ALTER TABLE `coordenador`
  ADD PRIMARY KEY (`id_coordenador`),
  ADD KEY `id_endereco` (`id_endereco`);

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `id_coordenador` (`id_coordenador`);

--
-- Índices de tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`id_disciplina`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_professor` (`id_professor`);

--
-- Índices de tabela `disciplina_turma`
--
ALTER TABLE `disciplina_turma`
  ADD PRIMARY KEY (`id_disciplina`,`id_turma`),
  ADD KEY `id_turma` (`id_turma`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`id_endereco`),
  ADD KEY `id_logradouro` (`id_logradouro`);

--
-- Índices de tabela `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Índices de tabela `frequencia`
--
ALTER TABLE `frequencia`
  ADD PRIMARY KEY (`id_frequencia`),
  ADD KEY `id_matricula` (`id_matricula`);

--
-- Índices de tabela `logradouro`
--
ALTER TABLE `logradouro`
  ADD PRIMARY KEY (`id_logradouro`),
  ADD KEY `id_bairro` (`id_bairro`);

--
-- Índices de tabela `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `id_aluno` (`id_aluno`),
  ADD KEY `id_turma` (`id_turma`);

--
-- Índices de tabela `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `id_matricula` (`id_matricula`),
  ADD KEY `id_avaliacao` (`id_avaliacao`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`id_professor`),
  ADD KEY `id_endereco` (`id_endereco`);

--
-- Índices de tabela `responsavel`
--
ALTER TABLE `responsavel`
  ADD PRIMARY KEY (`id_responsavel`),
  ADD KEY `id_endereco` (`id_endereco`);

--
-- Índices de tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`id_turma`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`);

--
-- Restrições para tabelas `aluno_responsavel`
--
ALTER TABLE `aluno_responsavel`
  ADD CONSTRAINT `aluno_responsavel_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`),
  ADD CONSTRAINT `aluno_responsavel_ibfk_2` FOREIGN KEY (`id_responsavel`) REFERENCES `responsavel` (`id_responsavel`);

--
-- Restrições para tabelas `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`);

--
-- Restrições para tabelas `bairro`
--
ALTER TABLE `bairro`
  ADD CONSTRAINT `bairro_ibfk_1` FOREIGN KEY (`id_cidade`) REFERENCES `cidade` (`id_cidade`);

--
-- Restrições para tabelas `boletim`
--
ALTER TABLE `boletim`
  ADD CONSTRAINT `boletim_ibfk_1` FOREIGN KEY (`id_frequencia`) REFERENCES `frequencia` (`id_frequencia`),
  ADD CONSTRAINT `boletim_ibfk_2` FOREIGN KEY (`id_matricula`) REFERENCES `matricula` (`id_matricula`);

--
-- Restrições para tabelas `cidade`
--
ALTER TABLE `cidade`
  ADD CONSTRAINT `cidade_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`);

--
-- Restrições para tabelas `coordenador`
--
ALTER TABLE `coordenador`
  ADD CONSTRAINT `coordenador_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`);

--
-- Restrições para tabelas `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_coordenador`) REFERENCES `coordenador` (`id_coordenador`);

--
-- Restrições para tabelas `disciplina`
--
ALTER TABLE `disciplina`
  ADD CONSTRAINT `disciplina_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `disciplina_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id_professor`);

--
-- Restrições para tabelas `disciplina_turma`
--
ALTER TABLE `disciplina_turma`
  ADD CONSTRAINT `disciplina_turma_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`),
  ADD CONSTRAINT `disciplina_turma_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`id_logradouro`) REFERENCES `logradouro` (`id_logradouro`);

--
-- Restrições para tabelas `frequencia`
--
ALTER TABLE `frequencia`
  ADD CONSTRAINT `frequencia_ibfk_1` FOREIGN KEY (`id_matricula`) REFERENCES `matricula` (`id_matricula`);

--
-- Restrições para tabelas `logradouro`
--
ALTER TABLE `logradouro`
  ADD CONSTRAINT `logradouro_ibfk_1` FOREIGN KEY (`id_bairro`) REFERENCES `bairro` (`id_bairro`);

--
-- Restrições para tabelas `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`),
  ADD CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`);

--
-- Restrições para tabelas `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`id_matricula`) REFERENCES `matricula` (`id_matricula`),
  ADD CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`id_avaliacao`) REFERENCES `avaliacao` (`id_avaliacao`);

--
-- Restrições para tabelas `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`);

--
-- Restrições para tabelas `responsavel`
--
ALTER TABLE `responsavel`
  ADD CONSTRAINT `responsavel_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`);

--
-- Restrições para tabelas `turma`
--
ALTER TABLE `turma`
  ADD CONSTRAINT `turma_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
