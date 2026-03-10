<?php
// index.php - Login Page
session_start();
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KnitOps Pro - Login</title>
    <!-- Bootstrap 5.3.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --slate-50: #f8fafc;
            --slate-900: #0f172a;
            --blue-600: #2563eb;
            --blue-700: #1d4ed8;
            --radius-xl: 1.5rem;
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--slate-900);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            overflow: hidden;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            width: 100%;
            max-width: 420px;
            padding: 3rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .logo-box {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, var(--blue-600), #4f46e5);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin: 0 auto 1.5rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .form-control {
            border-radius: 10px;
            padding: 0.625rem 1rem;
            border: 1px solid #e2e8f0;
        }
        .btn-primary {
            background-color: var(--blue-600);
            border: none;
            border-radius: 10px;
            font-weight: 600;
            padding: 0.75rem;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="text-center">
            <div class="logo-box">
                <i data-lucide="cpu" style="width: 32px; height: 32px;"></i>
            </div>
            <h2 class="fw-bold mb-1">KnitOps Pro</h2>
            <p class="text-muted small">Sign in to manage your knitting unit</p>
        </div>
        <form id="login-form" action="backend/auth.php" method="POST">
            <input type="hidden" name="action" value="login">
            <div class="mb-3">
                <label class="form-label small fw-bold">Email Address</label>
                <input type="email" name="email" class="form-control" value="admin@knitops.pro" required>
            </div>
            <div class="mb-4">
                <label class="form-label small fw-bold">Password</label>
                <input type="password" name="password" class="form-control" value="password123" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Sign In</button>
        </form>
    </div>
    <script>
        lucide.createIcons();
        // In a real app, you'd handle the response via AJAX or standard form submission
    </script>
</body>
</html>
