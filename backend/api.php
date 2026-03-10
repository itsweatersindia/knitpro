<?php
// api.php - Handle CRUD operations
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action === 'add_client') {
        $name = $_POST['name'];
        $region = $_POST['region'];
        $email = $_POST['email'];
        $contact = $_POST['contact_person'];

        $stmt = $pdo->prepare("INSERT INTO clients (name, region, email, contact_person) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $region, $email, $contact]);
        header('Location: ../clients.php');
        exit;
    }

    if ($action === 'add_style') {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $category = $_POST['category'];
        $yarn = $_POST['yarn_type'];
        $image = $_POST['image_url'];

        $stmt = $pdo->prepare("INSERT INTO styles (id, name, category, yarn_type, image_url) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id, $name, $category, $yarn, $image]);
        header('Location: ../styles.php');
        exit;
    }

    if ($action === 'add_order') {
        $id = $_POST['id'];
        $client_id = $_POST['client_id'];
        $style_id = $_POST['style_id'];
        $quantity = $_POST['quantity'];
        $deadline = $_POST['deadline'];

        $stmt = $pdo->prepare("INSERT INTO orders (id, client_id, style_id, quantity, deadline) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id, $client_id, $style_id, $quantity, $deadline]);
        header('Location: ../orders.php');
        exit;
    }

    if ($action === 'initiate_job') {
        $machine_id = $_POST['machine_id'];
        $order_id = $_POST['order_id'];

        $pdo->beginTransaction();
        try {
            // Update machine
            $stmt1 = $pdo->prepare("UPDATE machines SET status = 'running', current_job_id = ?, efficiency = 85.0 WHERE id = ?");
            $stmt1->execute([$order_id, $machine_id]);

            // Update order status
            $stmt2 = $pdo->prepare("UPDATE orders SET status = 'In Production' WHERE id = ?");
            $stmt2->execute([$order_id]);

            $pdo->commit();
            header('Location: ../knitting.php');
        } catch (Exception $e) {
            $pdo->rollBack();
            echo "Error: " . $e->getMessage();
        }
        exit;
    }
}
?>
