<body>
	<div class="wireframe">
		<div class="wireframe-label">WIREFRAME</div>
		<!-- Sidebar -->
		<div class="sidebar">
			<div class="sidebar-header">
				<div class="logo">Dashboard</div>
				<div class="user-info">John Doe</div>
			</div>
			<nav class="nav-menu">
				<div class="nav-section">
					<div class="nav-section-title">Main</div>
					<a href="#" class="nav-item">
						<div class="nav-icon">📊</div>
						<span>Overview</span>
					</a>
					<a href="#" class="nav-item">
						<div class="nav-icon">📈</div>
						<span>Analytics</span>
					</a>
				</div>
				<div class="nav-section">
					<div class="nav-section-title">Content</div>
					<a href="#" class="nav-item">
						<div class="nav-icon">📝</div>
						<span>My Articles</span>
						<span class="nav-badge">47</span>
					</a>
					<a href="#" class="nav-item">
						<div class="nav-icon">📄</div>
						<span>Drafts</span>
						<span class="nav-badge">12</span>
					</a>
					<a href="#" class="nav-item">
						<div class="nav-icon">📂</div>
						<span>Categories</span>
					</a>
					<a href="#" class="nav-item active">
						<div class="nav-icon">🏷️</div>
						<span>Tags</span>
					</a>
				</div>
				<div class="nav-section">
					<div class="nav-section-title">Media</div>
					<a href="#" class="nav-item">
						<div class="nav-icon">🖼️</div>
						<span>Images</span>
					</a>
					<a href="#" class="nav-item">
						<div class="nav-icon">📁</div>
						<span>Files</span>
					</a>
				</div>
				<div class="nav-section">
					<div class="nav-section-title">Settings</div>
					<a href="#" class="nav-item">
						<div class="nav-icon">👤</div>
						<span>Profile</span>
					</a>
					<a href="#" class="nav-item">
						<div class="nav-icon">⚙️</div>
						<span>Settings</span>
					</a>
				</div>
			</nav>
		</div>
		<!-- Main Content -->
		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard &gt; Tags</div>
					<h1 class="page-title">Tags Management</h1>
				</div>
				<button class="create-btn">+ Add Tag</button>
			</div>
			<div class="controls">
				<div class="left-controls">
					<input type="text" class="search-box" placeholder="Search tags..." />
					<select class="sort-select">
						<option>Sort by: Name</option>
						<option>Sort by: Usage</option>
						<option>Sort by: Newest</option>
					</select>
				</div>
			</div>
			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Manage all your article tags here
			</div>
			<div class="content">
				<div class="tags-management-table-container">
					<table class="tags-management-table">
						<thead>
							<tr>
								<th>Tag</th>
								<th>Description</th>
								<th>Articles using tag</th>
								<th>Created</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td
									><span class="tag-label" style="background:#e0eaff; color:#2a4d8f">frontend</span
									></td
								>
								<td>Articles about frontend dev</td>
								<td>18</td>
								<td>2024-06-22</td>
								<td class="tags-actions">
									<button class="action-btn">Edit</button>
									<button class="action-btn">Delete</button>
									<button class="action-btn">Merge</button>
								</td>
							</tr>
							<tr>
								<td
									><span class="tag-label" style="background:#e7ffe0; color:#1d642f"
										>javascript</span
									></td
								>
								<td>JS tips &amp; news</td>
								<td>31</td>
								<td>2024-05-13</td>
								<td class="tags-actions">
									<button class="action-btn">Edit</button>
									<button class="action-btn">Delete</button>
									<button class="action-btn">Merge</button>
								</td>
							</tr>
							<tr>
								<td><span class="tag-label" style="background:#fff0e0; color:#7a4922">css</span></td
								>
								<td>Styling, CSS grids, flexbox</td>
								<td>22</td>
								<td>2024-07-14</td>
								<td class="tags-actions">
									<button class="action-btn">Edit</button>
									<button class="action-btn">Delete</button>
									<button class="action-btn">Merge</button>
								</td>
							</tr>
							<tr>
								<td
									><span class="tag-label" style="background:#fbe0ff; color:#7d247a">react</span
									></td
								>
								<td>All about React</td>
								<td>12</td>
								<td>2024-01-05</td>
								<td class="tags-actions">
									<button class="action-btn">Edit</button>
									<button class="action-btn">Delete</button>
									<button class="action-btn">Merge</button>
								</td>
							</tr>
							<!-- More tag rows as needed -->
						</tbody>
					</table>
				</div>
				<div class="pagination">
					<button class="page-btn">&lt; Prev</button>
					<button class="page-btn active">1</button>
					<button class="page-btn">2</button>
					<button class="page-btn">3</button>
					<button class="page-btn">Next &gt;</button>
				</div>
			</div>
		</div>
	</div>
</body>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		font-family: Arial, sans-serif;
		background-color: #f5f5f5;
		color: #333;
	}
	.wireframe {
		border: 2px solid #333;
		background: white;
		margin: 20px;
		min-height: calc(100vh - 40px);
		display: flex;
		position: relative;
	}
	.sidebar {
		width: 250px;
		background: #f9f9f9;
		border-right: 2px solid #333;
		flex-shrink: 0;
	}
	.sidebar-header {
		padding: 20px;
		border-bottom: 1px solid #ddd;
	}
	.logo {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.user-info {
		font-size: 14px;
		color: #666;
	}
	.nav-menu {
		padding: 20px 0;
	}
	.nav-section {
		margin-bottom: 30px;
	}
	.nav-section-title {
		font-size: 12px;
		font-weight: bold;
		color: #888;
		text-transform: uppercase;
		padding: 0 20px;
		margin-bottom: 10px;
	}
	.nav-item {
		display: flex;
		align-items: center;
		padding: 12px 20px;
		color: #333;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.nav-item:hover {
		background: #f0f0f0;
	}
	.nav-item.active {
		background: #333;
		color: white;
	}
	.nav-icon {
		width: 20px;
		height: 20px;
		border: 1px solid currentColor;
		margin-right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}
	.nav-badge {
		margin-left: auto;
		background: #333;
		color: white;
		padding: 2px 6px;
		border-radius: 10px;
		font-size: 11px;
	}
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.header {
		border-bottom: 2px solid #333;
		padding: 20px;
		background: #f9f9f9;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.breadcrumb {
		font-size: 14px;
		color: #666;
	}
	.page-title {
		font-size: 28px;
		font-weight: bold;
		margin: 10px 0;
	}
	.create-btn {
		border: 2px solid #333;
		padding: 12px 24px;
		background: white;
		cursor: pointer;
		font-weight: bold;
	}
	.create-btn:hover {
		background: #f0f0f0;
	}
	.controls {
		padding: 20px;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 15px;
	}
	.left-controls {
		display: flex;
		gap: 15px;
		align-items: center;
	}
	.search-box,
	.sort-select {
		border: 2px solid #333;
		padding: 8px 12px;
		background: white;
	}
	.search-box {
		width: 220px;
	}
	.stats {
		font-size: 14px;
		color: #666;
	}
	.content {
		padding: 20px;
	}
	.tags-management-table-container {
		width: 100%;
		overflow-x: auto;
		margin-bottom: 24px;
	}
	.tags-management-table {
		width: 100%;
		border-collapse: collapse;
		background: #fafafa;
	}
	.tags-management-table th,
	.tags-management-table td {
		border: 1px solid #bbb;
		padding: 10px 12px;
		font-size: 14px;
		text-align: left;
	}
	.tags-management-table th {
		background: #f4f4f4;
		color: #444;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 13px;
	}
	.tag-label {
		display: inline-block;
		padding: 4px 10px;
		border-radius: 15px;
		font-size: 13px;
		font-weight: bold;
		background: #eee;
		color: #333;
	}
	.tags-actions {
		display: flex;
		gap: 8px;
	}
	.action-btn {
		border: 1px solid #333;
		padding: 5px 12px;
		background: white;
		cursor: pointer;
		font-size: 13px;
		border-radius: 4px;
	}
	.action-btn:hover {
		background: #f0f0f0;
	}
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
		padding-top: 10px;
	}
	.page-btn {
		border: 2px solid #333;
		padding: 8px 12px;
		background: white;
		cursor: pointer;
	}
	.page-btn.active {
		background: #333;
		color: white;
	}
	.wireframe-label {
		position: absolute;
		background: #333;
		color: white;
		padding: 5px 10px;
		font-size: 12px;
		font-weight: bold;
		top: -15px;
		left: 20px;
	}
	@media (max-width: 1000px) {
		.tags-management-table th,
		.tags-management-table td {
			font-size: 12px;
			padding: 7px 6px;
		}
	}
	@media (max-width: 768px) {
		.wireframe {
			flex-direction: column;
		}
		.sidebar {
			width: 100%;
			position: relative;
		}
		.controls {
			flex-direction: column;
			align-items: stretch;
		}
		.left-controls {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
