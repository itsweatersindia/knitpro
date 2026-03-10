<?php
// header.php - Common header for all authenticated pages
require_once 'backend/auth.php';
checkAuth();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KnitOps Pro - Industrial Management</title>
    <!-- Bootstrap 5.3.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --slate-50: #f8fafc;
            --slate-100: #f1f5f9;
            --slate-200: #e2e8f0;
            --slate-300: #cbd5e1;
            --slate-400: #94a3b8;
            --slate-500: #64748b;
            --slate-600: #475569;
            --slate-700: #334155;
            --slate-800: #1e293b;
            --slate-900: #0f172a;
            --blue-600: #2563eb;
            --blue-700: #1d4ed8;
            --emerald-500: #10b981;
            --rose-500: #f43f5e;
            --amber-500: #f59e0b;
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
            --radius-xl: 1.5rem;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--slate-50);
            color: var(--slate-900);
            overflow: hidden;
            height: 100vh;
            margin: 0;
        }
        #app-container {
            display: flex;
            height: 100vh;
            width: 100vw;
        }
        .sidebar {
            width: 280px;
            background-color: var(--slate-900);
            color: var(--slate-300);
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;
            height: 100%;
            border-right: 1px solid var(--slate-800);
        }
        .sidebar-header {
            padding: 2rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .logo-box {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--blue-600), #4f46e5);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .nav-section-label {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--slate-500);
            padding: 1.5rem 1.5rem 0.5rem;
            display: block;
        }
        .nav-link {
            color: var(--slate-400);
            padding: 0.875rem 1.25rem;
            border-radius: 10px;
            margin: 0.125rem 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9375rem;
            transition: all 0.2s ease;
        }
        .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.05);
            color: white;
        }
        .nav-link.active {
            background-color: var(--blue-600);
            color: white;
            box-shadow: 0 8px 20px -6px rgba(37, 99, 235, 0.5);
        }
        .main-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: var(--slate-50);
        }
        .header {
            height: 72px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--slate-200);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            flex-shrink: 0;
            z-index: 20;
        }
        .content-area {
            flex-grow: 1;
            overflow-y: auto;
            padding: 2rem;
        }
        .stat-card {
            background: white;
            border: 1px solid var(--slate-200);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
        }
        .table-container {
            background: white;
            border: 1px solid var(--slate-200);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }
    </style>
</head>
<body>
    <div id="app-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo-box">
                    <i data-lucide="cpu" style="width: 20px; height: 20px;"></i>
                </div>
                <span class="fw-bold text-white fs-5">KnitOps Pro</span>
            </div>
            <div class="flex-grow-1 mt-2">
                <span class="nav-section-label">Main Menu</span>
                <a href="dashboard.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'active' : ''; ?>">
                    <i data-lucide="layout-dashboard" style="width: 20px;"></i>
                    <span>Dashboard</span>
                </a>
                <a href="clients.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'clients.php' ? 'active' : ''; ?>">
                    <i data-lucide="users" style="width: 20px;"></i>
                    <span>Clients</span>
                </a>
                <a href="styles.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'styles.php' ? 'active' : ''; ?>">
                    <i data-lucide="palette" style="width: 20px;"></i>
                    <span>Styles</span>
                </a>
                <a href="orders.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'orders.php' ? 'active' : ''; ?>">
                    <i data-lucide="shopping-cart" style="width: 20px;"></i>
                    <span>Orders</span>
                </a>

                <span class="nav-section-label">Production</span>
                <a href="knitting.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'knitting.php' ? 'active' : ''; ?>">
                    <i data-lucide="cpu" style="width: 20px;"></i>
                    <span>Knitting</span>
                </a>
            </div>
            <div class="p-3 border-top border-secondary" style="border-color: rgba(255,255,255,0.05) !important;">
                <a href="backend/auth.php?logout=1" class="nav-link text-danger">
                    <i data-lucide="log-out" style="width: 20px;"></i>
                    <span>Sign Out</span>
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <header class="header">
                <div class="d-flex align-items-center gap-3">
                    <span class="text-dark fw-medium"><?php echo ucfirst(str_replace('.php', '', basename($_SERVER['PHP_SELF']))); ?></span>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="text-end d-none d-sm-block">
                            <p class="mb-0 fw-bold small"><?php echo $_SESSION['user_name']; ?></p>
                            <p class="mb-0 text-muted" style="font-size: 10px;"><?php echo ucfirst($_SESSION['user_role']); ?></p>
                        </div>
                        <div class="bg-light rounded-circle d-flex align-items-center justify-center border" style="width: 36px; height: 36px;">
                            <i data-lucide="user" class="text-muted" style="width: 18px;"></i>
                        </div>
                    </div>
                </div>
            </header>
            <div class="content-area">
