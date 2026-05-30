<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "agroconsultoria_db";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

$nome = $_POST['nome'] ?? "";
$email = $_POST['email'] ?? "";
$telefone = $_POST['telefone'] ?? "";
$tipo_propriedade = $_POST['tipo_propriedade'] ?? "";
$plano = $_POST['plano'] ?? "";
$data_preferida = $_POST['data_preferida'] ?? "";
$mensagem = $_POST['mensagem'] ?? "";

$sql = "
    INSERT INTO consultas_leads 
    (nome, email, telefone, tipo_propriedade, plano, data_preferida, mensagem)
    VALUES (?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Erro ao preparar SQL: " . $conn->error);
}

$stmt->bind_param(
    "sssssss",
    $nome,
    $email,
    $telefone,
    $tipo_propriedade,
    $plano,
    $data_preferida,
    $mensagem
);

if ($stmt->execute()) {
    echo "<script>
            alert('Consulta enviada com sucesso!');
            window.location.href = 'index.html';
          </script>";
} else {
    echo "<script>
            alert('Erro ao fazer o registro: " . $stmt->error . "');
            window.history.back();
          </script>";
}

$stmt->close();
$conn->close();
?>
