<?php
// db_connect.php - Database connection configuration

$host = 'localhost';
$db   = 'knitops_pro';
$user = 'root';
$pass = ''; // Default for most local setups
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     // In production, don't show the error message
     die("Database connection failed: " . $e->getMessage());
}
?>
