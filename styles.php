<?php
require_once 'backend/db_connect.php';
include 'header.php';

// Fetch styles
$styles = $pdo->query("SELECT * FROM styles ORDER BY created_at DESC")->fetchAll();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h2 class="fw-bold mb-1">Style Library</h2>
        <p class="text-muted mb-0">Technical specifications and design catalog</p>
    </div>
    <button class="btn btn-primary fw-bold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addStyleModal">
        <i data-lucide="plus" style="width: 18px;"></i>
        Create New Style
    </button>
</div>

<div class="row g-4">
    <?php foreach ($styles as $style): ?>
    <div class="col-md-3">
        <div class="stat-card p-0 overflow-hidden">
            <img src="<?php echo htmlspecialchars($style['image_url']); ?>" class="w-100" style="height: 180px; object-fit: cover;" alt="<?php echo htmlspecialchars($style['name']); ?>">
            <div class="p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <p class="text-muted x-small mb-0"><?php echo htmlspecialchars($style['category']); ?></p>
                        <h6 class="fw-bold mb-0"><?php echo htmlspecialchars($style['name']); ?></h6>
                    </div>
                    <span class="badge bg-light text-dark x-small"><?php echo htmlspecialchars($style['id']); ?></span>
                </div>
                <div class="d-flex align-items-center gap-2 text-muted x-small mb-3">
                    <i data-lucide="info" style="width: 12px;"></i>
                    <span><?php echo htmlspecialchars($style['yarn_type']); ?></span>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-light btn-sm flex-grow-1 x-small fw-bold">Edit Details</button>
                    <button class="btn btn-light btn-sm x-small"><i data-lucide="more-horizontal" style="width: 14px;"></i></button>
                </div>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- Add Style Modal -->
<div class="modal fade" id="addStyleModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem;">
            <div class="modal-header border-0 p-4 pb-0">
                <h5 class="modal-title fw-bold">Create New Style</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <form action="backend/api.php" method="POST">
                    <input type="hidden" name="action" value="add_style">
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Style ID</label>
                        <input type="text" name="id" class="form-control bg-light border-0" placeholder="e.g. ST-2024-005" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Style Name</label>
                        <input type="text" name="name" class="form-control bg-light border-0" placeholder="e.g. Classic Crewneck" required>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Category</label>
                            <input type="text" name="category" class="form-control bg-light border-0" placeholder="e.g. Sweater">
                        </div>
                        <div class="col-6">
                            <label class="form-label small fw-bold text-muted text-uppercase">Yarn Type</label>
                            <input type="text" name="yarn_type" class="form-control bg-light border-0" placeholder="e.g. Cotton 40s">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold text-muted text-uppercase">Image URL</label>
                        <input type="url" name="image_url" class="form-control bg-light border-0" placeholder="https://...">
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mt-4 py-2 fw-bold">Save Style</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
