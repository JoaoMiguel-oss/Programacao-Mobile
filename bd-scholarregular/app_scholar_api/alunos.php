<?php 
require_once "conexao.php"; 
header("Content-Type: application/json; charset=UTF-8"); 
$sql = "SELECT id, nome, ..., status FROM alunos WHERE status = 'A' ORDER BY nome"; $stmt = $pdo->query($sql); 
$alunos = $stmt->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($alunos); 
?>
