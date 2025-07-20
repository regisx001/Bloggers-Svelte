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
					<a href="#" class="nav-item">
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
				<div class="nav-section">
					<div class="nav-section-title">Activity</div>
					<a href="#" class="nav-item active">
						<div class="nav-icon">🔔</div>
						<span>Activity</span>
					</a>
				</div>
			</nav>
		</div>
		<!-- Main Content -->
		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard &gt; Activity</div>
					<h1 class="page-title">Activity</h1>
				</div>
				<button class="create-btn" disabled style="opacity: 0.5; cursor: default;">&nbsp;</button>
			</div>
			<div class="controls" style="border-bottom: none;">
				<div class="left-controls">
					<select class="filter-select">
						<option>All Types</option>
						<option>Articles</option>
						<option>Comments</option>
						<option>Edits</option>
						<option>Likes</option>
						<option>Uploads</option>
					</select>
					<select class="sort-select">
						<option>Sort by: Newest</option>
						<option>Sort by: Oldest</option>
					</select>
				</div>
			</div>
			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Your recent activity and notifications
			</div>
			<div class="content">
				<div class="activity-timeline">
					<div class="activity-date-group">
						<div class="activity-date-label">Today</div>
						<ul class="activity-list">
							<li class="activity-item">
								<span class="activity-icon">📝</span>
								<span class="activity-description"
									>Published article <strong>Async JavaScript Patterns</strong></span
								>
								<span class="activity-time">1 hour ago</span>
							</li>
							<li class="activity-item">
								<span class="activity-icon">💬</span>
								<span class="activity-description"
									>Commented on <strong>Building Responsive Layouts</strong></span
								>
								<span class="activity-time">2 hours ago</span>
							</li>
							<li class="activity-item">
								<span class="activity-icon">➕</span>
								<span class="activity-description"
									>Uploaded file <strong>design-assets.zip</strong></span
								>
								<span class="activity-time">3 hours ago</span>
							</li>
						</ul>
					</div>
					<div class="activity-date-group">
						<div class="activity-date-label">Yesterday</div>
						<ul class="activity-list">
							<li class="activity-item">
								<span class="activity-icon">✏️</span>
								<span class="activity-description"
									>Edited article <strong>JavaScript Performance Optimization</strong></span
								>
								<span class="activity-time">20 hours ago</span>
							</li>
							<li class="activity-item">
								<span class="activity-icon">👍</span>
								<span class="activity-description"
									>Liked comment on <strong>Getting Started with React Hooks</strong></span
								>
								<span class="activity-time">22 hours ago</span>
							</li>
						</ul>
					</div>
					<div class="activity-date-group">
						<div class="activity-date-label">Earlier</div>
						<ul class="activity-list">
							<li class="activity-item">
								<span class="activity-icon">🏷️</span>
								<span class="activity-description"
									>Added tag <strong>frontend</strong> to
									<strong>Advanced CSS Grid Techniques</strong></span
								>
								<span class="activity-time">2 days ago</span>
							</li>
							<li class="activity-item">
								<span class="activity-icon">📂</span>
								<span class="activity-description"
									>Created new category <strong>Performance</strong></span
								>
								<span class="activity-time">3 days ago</span>
							</li>
							<li class="activity-item">
								<span class="activity-icon">🔔</span>
								<span class="activity-description"
									>Received notification: <strong>“Comment awaiting moderation”</strong></span
								>
								<span class="activity-time">4 days ago</span>
							</li>
						</ul>
					</div>
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
	.filter-select,
	.sort-select {
		border: 2px solid #333;
		padding: 8px 12px;
		background: white;
	}
	.stats {
		font-size: 14px;
		color: #666;
	}
	.content {
		padding: 20px;
	}
	.activity-timeline {
		display: flex;
		flex-direction: column;
		gap: 34px;
	}
	.activity-date-group {
		margin-bottom: 10px;
	}
	.activity-date-label {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
		padding-left: 6px;
	}
	.activity-list {
		list-style-type: none;
	}
	.activity-item {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 12px;
		padding: 10px 12px;
		border-left: 3px solid #333;
		background: #fafafa;
	}
	.activity-icon {
		font-size: 20px;
	}
	.activity-description {
		font-size: 14px;
		color: #555;
		flex: 1;
	}
	.activity-time {
		font-size: 12px;
		color: #888;
		min-width: 90px;
		text-align: right;
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
		.activity-timeline {
			gap: 18px;
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
