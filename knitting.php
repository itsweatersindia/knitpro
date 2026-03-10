<?php
require_once 'backend/db_connect.php';
include 'header.php';

// Fetch machines with current job details
$machines = $pdo->query("
    SELECT m.*, o.style_id, s.name as style_name, o.progress as job_progress 
    FROM machines m 
    LEFT JOIN orders o ON m.current_job_id = o.id 
    LEFT JOIN styles s ON o.style_id = s.id 
    ORDER BY m.id ASC
")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1">Machine Floor Overview</h2>
        <p class="text-muted mb-0">Real-time machine performance and speed tracking</p>
    </div>
    <button class="btn btn-success fw-bold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#initiateJobModal">
        <i data-lucide="plus" style="width: 18px;"></i>
        Initiate New Job
    </button>
</div>

<div class="row g-4">
    <?php foreach ($machines as $machine): ?>
    <div class="col-md-4">
        <div class="stat-card">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="icon-bg <?php echo $machine['status'] == 'running' ? 'bg-emerald-light' : ($machine['status'] == 'error' ? 'bg-danger-light' : 'bg-slate-light'); ?>" style="width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background-color: <?php echo $machine['status'] == 'running' ? '#ecfdf5' : ($machine['status'] == 'error' ? '#fff1f2' : '#f1f5f9'); ?>; color: <?php echo $machine['status'] == 'running' ? '#10b981' : ($machine['status'] == 'error' ? '#f43f5e' : '#64748b'); ?>;">
                        <i data-lucide="cpu" style="width: 20px;"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0"><?php echo $machine['id']; ?></h6>
                        <span class="x-small text-muted text-uppercase fw-bold"><?php echo $machine['status']; ?></span>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-light btn-sm" data-bs-toggle="dropdown"><i data-lucide="more-vertical" style="width: 14px;"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg" style="border-radius: 12px;">
                        <li><a class="dropdown-item small" href="#">Diagnostics</a></li>
                        <li><a class="dropdown-item small" href="#">Maintenance</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item small text-danger" href="#">Emergency Stop</a></li>
                    </ul>
                </div>
            </div>

            <?php if ($machine['current_job_id']): ?>
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted x-small">Current Job: <span class="text-dark fw-bold"><?php echo $machine['current_job_id']; ?></span></span>
                    <span class="text-muted x-small"><?php echo $machine['job_progress']; ?>%</span>
                </div>
                <div class="progress" style="height: 6px; border-radius: 10px;">
                    <div class="progress-bar bg-success" style="width: <?php echo $machine['job_progress']; ?>%; border-radius: 10px;"></div>
                </div>
                <p class="x-small text-muted mt-2 mb-0">Style: <span class="text-dark fw-medium"><?php echo $machine['style_name']; ?></span></p>
            </div>
            <?php else: ?>
            <div class="py-4 text-center border border-dashed rounded-3 mb-3">
                <p class="text-muted x-small mb-0">No active job assigned</p>
            </div>
            <?php endif; ?>

            <div class="d-flex justify-content-between pt-3 border-top">
                <div class="text-center flex-grow-1 border-end">
                    <p class="text-muted xx-small text-uppercase mb-0">Efficiency</p>
                    <p class="fw-bold small mb-0"><?php echo $machine['efficiency']; ?>%</p>
                </div>
                <div class="text-center flex-grow-1">
                    <p class="text-muted xx-small text-uppercase mb-0">RPM</p>
                    <p class="fw-bold small mb-0"><?php echo $machine['status'] == 'running' ? rand(18, 24) : '0'; ?></p>
                </div>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- Initiate Job Modal -->
<div class="modal fade" id="initiateJobModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem;">
            <div class="modal-header border-0 p-4 pb-0">
                <h5 class="modal-title fw-bold">Initiate New Job</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <form action="backend/api.php" method="POST">
                    <input type="hidden" name="action" value="initiate_job">
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Select Machine</label>
                        <select name="machine_id" class="form-control bg-light border-0" required>
                            <?php
                            $idle_machines = $pdo->query("SELECT id FROM machines WHERE status = 'idle'")->fetchAll();
                            foreach ($idle_machines as $m) {
                                echo "<option value='{$m['id']}'>{$m['id']}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Select Order</label>
                        <select name="order_id" class="form-control bg-light border-0" required>
                            <?php
                            $pending_orders = $pdo->query("SELECT id FROM orders WHERE status = 'Pending'")->fetchAll();
                            foreach ($pending_orders as $o) {
                                echo "<option value='{$o['id']}'>{$o['id']}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success w-100 mt-4 py-2 fw-bold">Start Production</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
