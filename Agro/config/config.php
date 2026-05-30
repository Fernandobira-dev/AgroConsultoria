<?php
$host = "localhost";  
$usuario = "root";   
$senha = "";         
$nome_banco = "agroconsultoria_db";  

// Tentativa de conexão com o banco de dados
try {
    $conn = new mysqli($host, $usuario, $senha, $nome_banco);

    // Verificando se a conexão foi bem-sucedida
    if ($conn->connect_error) {
        throw new Exception("Conexão falhou: " . $conn->connect_error);
    }
    
    // Definindo a codificação de caracteres para evitar problemas com caracteres especiais
    $conn->set_charset("utf8");


} catch (Exception $e) {
    // Caso ocorra um erro, exibe uma mensagem
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage();
    exit();
}


?>

