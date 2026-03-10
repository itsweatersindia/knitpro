<?php
require_once 'backend/db_connect.php';
include 'header.php';

// Fetch some stats
$active_machines = $pdo->query("SELECT COUNT(*) FROM machines WHERE status = 'running'")->fetchColumn();
$total_machines = $pdo->query("SELECT COUNT(*) FROM machines")->fetchColumn();
$pending_orders = $pdo->query("SELECT COUNT(*) FROM orders WHERE status = 'Pending'")->fetchColumn();
?>

<div class="d-flex justify-content-between align-items-end mb-4">
    <div>
        <h2 class="fw-bold mb-1">Elite Knitting Unit</h2>
        <p class="text-muted mb-0">Real-time floor overview and performance metrics</p>
    </div>
    <div class="bg-white border rounded-pill px-3 py-1 d-flex align-items-center gap-2 shadow-sm">
        <div class="rounded-circle bg-success" style="width: 8px; height: 8px;"></div>
        <span class="small fw-medium">System Live</span>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between mb-3">
                <div class="icon-bg bg-blue-light" style="background-color: var(--blue-50); color: var(--blue-600); width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="cpu" style="width: 20px;"></i>
                </div>
                <span class="text-muted small">Live</span>
            </div>
            <p class="text-muted small mb-1">Active Machines</p>
            <h3 class="fw-bold mb-1"><?php echo $active_machines; ?>/<?php echo $total_machines; ?></h3>
            <p class="text-muted x-small mb-0">Efficiency Tracking</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between mb-3">
                <div class="icon-bg" style="background-color: #ecfdf5; color: #10b981; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="box" style="width: 20px;"></i>
                </div>
                <span class="text-muted small">Live</span>
            </div>
            <p class="text-muted small mb-1">Today's Production</p>
            <h3 class="fw-bold mb-1">1,284 kg</h3>
            <p class="text-success x-small mb-0">+12% from avg</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between mb-3">
                <div class="icon-bg" style="background-color: #fffbeb; color: #f59e0b; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="shield-check" style="width: 20px;"></i>
                </div>
                <span class="text-muted small">Live</span>
            </div>
            <p class="text-muted small mb-1">Quality Score</p>
            <h3 class="fw-bold mb-1">98.2%</h3>
            <p class="text-muted x-small mb-0">0.8% Rejection</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between mb-3">
                <div class="icon-bg" style="background-color: #faf5ff; color: #9333ea; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="package" style="width: 20px;"></i>
                </div>
                <span class="text-muted small">Live</span>
            </div>
            <p class="text-muted small mb-1">Pending Orders</p>
            <h3 class="fw-bold mb-1"><?php echo $pending_orders; ?></h3>
            <p class="text-muted x-small mb-0">Awaiting Production</p>
        </div>
    </div>
</div>

<div class="row g-4">
    <div class="col-lg-8">
        <div class="table-container p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold mb-0">Machine Status Matrix</h5>
                <a href="knitting.php" class="btn btn-link btn-sm text-decoration-none fw-bold">View All</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(56px, 1fr)); gap: 1rem;">
                <?php
                $machines = $pdo->query("SELECT * FROM machines ORDER BY id ASC")->fetchAll();
                foreach ($machines as $machine) {
                    $status_class = $machine['status'];
                    echo "<div class='machine-box $status_class' style='aspect-ratio: 1; border-radius: 12px; border: 1px solid var(--slate-200); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; position: relative; background-color: " . ($status_class == 'running' ? '#ecfdf5' : ($status_class == 'error' ? '#fff1f2' : 'white')) . "; color: " . ($status_class == 'running' ? '#059669' : ($status_class == 'error' ? '#f43f5e' : '#64748b')) . ";'>
                            " . str_replace('M-', '', $machine['id']) . "
                            <div style='position: absolute; top: 6px; right: 6px; width: 6px; height: 6px; border-radius: 50%; background-color: " . ($status_class == 'running' ? '#10b981' : ($status_class == 'error' ? '#f43f5e' : '#cbd5e1')) . ";'></div>
                          </div>";
                }
                ?>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="table-container p-4">
            <h5 class="fw-bold mb-4">Recent Alerts</h5>
            <div class="d-flex flex-column gap-3">
                <?php
                $alerts = $pdo->query("SELECT * FROM machines WHERE last_alert IS NOT NULL LIMIT 5")->fetchAll();
                if (empty($alerts)) {
                    echo "<p class='text-muted small'>No active alerts</p>";
                }
                foreach ($alerts as $alert) {
                    echo "<div class='d-flex gap-3'>
                            <div class='rounded-circle bg-danger mt-1' style='width: 8px; height: 8px; flex-shrink: 0;'></div>
                            <div>
                                <p class='mb-0 small fw-bold'>{$alert['last_alert']} on {$alert['id']}</p>
                                <p class='mb-0 x-small text-muted'>Just now</p>
                            </div>
                          </div>";
                }
                ?>
            </div>
            <button class="btn btn-light w-100 mt-4 py-2 small fw-bold">Notification Center</button>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
