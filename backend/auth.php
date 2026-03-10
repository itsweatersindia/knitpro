<?php
// auth.php - Authentication logic
session_start();
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'login') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_role'] = $user['role'];
            
            header('Location: ../dashboard.php');
            exit;
        } else {
            header('Location: ../index.php?error=1');
            exit;
        }
    }
}

// Handle logout via GET
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ../index.php');
    exit;
}

// Check if logged in for page access
function checkAuth() {
    if (!isset($_SESSION['user_id'])) {
        header('Location: ../index.php');
        exit;
    }
}
?>
