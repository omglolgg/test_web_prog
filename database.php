<?php 
    $mail = $_POST['mail']; 

    $servername = "localhost"; 
    $username = "root"; 
    $password = ""; 
    $dbname = "database"; 
 
 
    $conn = new mysqli($servername,$username, $password, $dbname); 
    if ($conn->connect_error){ 
        die("Ошибка: " . $conn->connect_error); 
    } 
    $sql = "INSERT INTO mail (mail) 
VALUES ($mail)"; 
 
    if ($conn->query($sql) === TRUE){ 
        echo "данные отправлены"; 
    }else { 
        echo "Error" . $sql . $conn->error; 
    } 
    header("Location: index.html"); 
 
$conn->close(); 
?>