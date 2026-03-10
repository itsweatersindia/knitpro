<?php
require_once 'backend/db_connect.php';
include 'header.php';

// Fetch orders with client and style names
$orders = $pdo->query("
    SELECT o.*, c.name as client_name, s.name as style_name 
    FROM orders o 
    JOIN clients c ON o.client_id = c.id 
    JOIN styles s ON o.style_id = s.id 
    ORDER BY o.created_at DESC
")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1">Order Management</h2>
        <p class="text-muted mb-0">Track production lifecycle from order to delivery</p>
    </div>
    <button class="btn btn-primary fw-bold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addOrderModal">
        <i data-lucide="shopping-cart" style="width: 18px;"></i>
        New Order
    </button>
</div>

<div class="table-container">
    <table class="table mb-0">
        <thead style="background-color: var(--slate-50); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.075em; color: var(--slate-500);">
            <tr>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Order ID</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Client</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Style</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Quantity</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Deadline</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Status</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);" class="text-end">Progress</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($orders as $order): ?>
            <tr>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);">
                    <div class="fw-bold"><?php echo htmlspecialchars($order['id']); ?></div>
                </td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);"><?php echo htmlspecialchars($order['client_name']); ?></td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);"><?php echo htmlspecialchars($order['style_name']); ?></td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);"><?php echo number_format($order['quantity']); ?></td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);"><?php echo date('M d, Y', strtotime($order['deadline'])); ?></td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);">
                    <span class="status-pill pill-blue" style="padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.025em; background-color: #eff6ff; color: #2563eb;">
                        <?php echo $order['status']; ?>
                    </span>
                </td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);" class="text-end">
                    <div class="d-flex align-items-center gap-2 justify-content-end">
                        <div class="progress flex-grow-1" style="height: 6px; width: 60px; border-radius: 10px;">
                            <div class="progress-bar bg-primary" style="width: <?php echo $order['progress']; ?>%; border-radius: 10px;"></div>
                        </div>
                        <span class="x-small fw-bold"><?php echo $order['progress']; ?>%</span>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<!-- Add Order Modal -->
<div class="modal fade" id="addOrderModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem;">
            <div class="modal-header border-0 p-4 pb-0">
                <h5 class="modal-title fw-bold">New Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <form action="backend/api.php" method="POST">
                    <input type="hidden" name="action" value="add_order">
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Order ID</label>
                        <input type="text" name="id" class="form-control bg-light border-0" placeholder="e.g. ORD-8423" required>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Client</label>
                            <select name="client_id" class="form-control bg-light border-0" required>
                                <?php
                                $clients = $pdo->query("SELECT id, name FROM clients")->fetchAll();
                                foreach ($clients as $client) {
                                    echo "<option value='{$client['id']}'>{$client['name']}</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Style</label>
                            <select name="style_id" class="form-control bg-light border-0" required>
                                <?php
                                $styles = $pdo->query("SELECT id, name FROM styles")->fetchAll();
                                foreach ($styles as $style) {
                                    echo "<option value='{$style['id']}'>{$style['name']}</option>";
                                }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Quantity</label>
                            <input type="number" name="quantity" class="form-control bg-light border-0" required>
                        </div>
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Deadline</label>
                            <input type="date" name="deadline" class="form-control bg-light border-0" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mt-4 py-2 fw-bold">Create Order</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
