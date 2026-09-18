<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "escola2";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro de conexão com o banco: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nome) && !empty($data->cpf) && !empty($data->data_nascimento)) {
    $nome = $conn->real_escape_string($data->nome);
    $cpf = $conn->real_escape_string($data->cpf);
    $data_nascimento = $conn->real_escape_string($data->data_nascimento);
    $email = !empty($data->email) ? "'" . $conn->real_escape_string($data->email) . "'" : "NULL";

    // Busca um id_endereco válido para não quebrar a Foreign Key
    $resEndereco = $conn->query("SELECT id_endereco FROM endereco LIMIT 1");
    if ($resEndereco && $resEndereco->num_rows > 0) {
        $rowEnd = $resEndereco->fetch_assoc();
        $id_endereco = $rowEnd['id_endereco'];
    } else {
        $id_endereco = 1;
    }

    $sql = "INSERT INTO aluno (nome, cpf, data_nascimento, email, id_endereco) 
            VALUES ('$nome', '$cpf', '$data_nascimento', $email, $id_endereco)";

    if ($conn->query($sql)) {
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Aluno cadastrado com sucesso!"
        ]);
    } else {
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Erro ao inserir no MySQL: " . $conn->error
        ]);
    }
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Preencha os campos obrigatórios: Nome, CPF e Data de Nascimento."
    ]);
}

$conn->close();
?>