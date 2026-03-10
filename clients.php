<?php
require_once 'backend/db_connect.php';
include 'header.php';

// Fetch clients
$clients = $pdo->query("SELECT * FROM clients ORDER BY name ASC")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1">Client Directory</h2>
        <p class="text-muted mb-0">Manage customer profiles and partnership history</p>
    </div>
    <button class="btn btn-primary fw-bold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addClientModal">
        <i data-lucide="plus" style="width: 18px;"></i>
        Add New Client
    </button>
</div>

<div class="table-container">
    <table class="table mb-0">
        <thead style="background-color: var(--slate-50); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.075em; color: var(--slate-500);">
            <tr>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Client Name</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Region</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);">Status</th>
                <th style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--slate-200);" class="text-end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($clients as $client): ?>
            <tr>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);">
                    <div class="fw-bold"><?php echo htmlspecialchars($client['name']); ?></div>
                    <div class="text-muted x-small"><?php echo htmlspecialchars($client['email']); ?></div>
                </td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);"><?php echo htmlspecialchars($client['region']); ?></td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);">
                    <span class="status-pill <?php echo $client['status'] == 'Active' ? 'pill-emerald' : 'pill-slate'; ?>" style="padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.025em; background-color: <?php echo $client['status'] == 'Active' ? '#ecfdf5' : '#f1f5f9'; ?>; color: <?php echo $client['status'] == 'Active' ? '#059669' : '#475569'; ?>;">
                        <?php echo $client['status']; ?>
                    </span>
                </td>
                <td style="padding: 1.25rem 1.5rem; font-size: 0.9375rem; vertical-align: middle; border-bottom: 1px solid var(--slate-100);" class="text-end">
                    <button class="btn btn-light btn-sm"><i data-lucide="edit-2" style="width: 14px;"></i></button>
                    <button class="btn btn-light btn-sm text-danger"><i data-lucide="trash-2" style="width: 14px;"></i></button>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<!-- Add Client Modal -->
<div class="modal fade" id="addClientModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem;">
            <div class="modal-header border-0 p-4 pb-0">
                <h5 class="modal-title fw-bold">Add New Client</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <form action="backend/api.php" method="POST">
                    <input type="hidden" name="action" value="add_client">
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Client Name</label>
                        <input type="text" name="name" class="form-control bg-light border-0" placeholder="e.g. Nordic Apparel Group" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Region</label>
                        <input type="text" name="region" class="form-control bg-light border-0" placeholder="e.g. Oslo, Norway" required>
                    </div>
                    <div class="row g-3">
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Email</label>
                            <input type="email" name="email" class="form-control bg-light border-0" placeholder="contact@client.com">
                        </div>
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Contact Person</label>
                            <input type="text" name="contact_person" class="form-control bg-light border-0" placeholder="Name">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mt-4 py-2 fw-bold">Save Client Profile</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
