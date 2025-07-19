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
					<div class="nav-section-title">Notifications</div>
					<a href="#" class="nav-item active">
						<div class="nav-icon">🔔</div>
						<span>Notifications</span>
					</a>
				</div>
			</nav>
		</div>
		<!-- Main Content -->
		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard &gt; Notifications</div>
					<h1 class="page-title">Notifications Center</h1>
				</div>
				<button class="create-btn" disabled style="opacity: 0.5; cursor: default;">&nbsp;</button>
			</div>
			<div class="controls" style="border-bottom: none;">
				<div class="left-controls">
					<select class="filter-select">
						<option>All Notifications</option>
						<option>Unread</option>
						<option>Mentions</option>
						<option>Comments</option>
						<option>System</option>
					</select>
					<select class="sort-select">
						<option>Sort by: Newest</option>
						<option>Sort by: Oldest</option>
					</select>
				</div>
				<div style="display: flex; gap: 10px;">
					<button class="action-btn">Mark All as Read</button>
					<button class="action-btn">Clear All</button>
				</div>
			</div>
			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Your notifications and system messages
			</div>
			<div class="content">
				<div class="notifications-list">
					<div class="notification-group">
						<div class="notification-date-label">Today</div>
						<ul class="notification-items">
							<li class="notification-item unread">
								<span class="notification-icon">💬</span>
								<span class="notification-text">
									<strong>Jane Smith</strong> commented on
									<strong>“Building Responsive Layouts”</strong>
								</span>
								<span class="notification-time">12 min ago</span>
								<button class="notification-action">Mark as Read</button>
								<button class="notification-action">Delete</button>
							</li>
							<li class="notification-item mention unread">
								<span class="notification-icon">🔔</span>
								<span class="notification-text">
									You were <strong>@mentioned</strong> in
									<strong>“Advanced CSS Grid Techniques”</strong>
								</span>
								<span class="notification-time">1 hour ago</span>
								<button class="notification-action">Mark as Read</button>
								<button class="notification-action">Delete</button>
							</li>
						</ul>
					</div>
					<div class="notification-group">
						<div class="notification-date-label">Yesterday</div>
						<ul class="notification-items">
							<li class="notification-item">
								<span class="notification-icon">🔔</span>
								<span class="notification-text">
									System: New feature <strong>“Media Gallery”</strong> is now available!
								</span>
								<span class="notification-time">20 hours ago</span>
								<button class="notification-action">Delete</button>
							</li>
							<li class="notification-item">
								<span class="notification-icon">👍</span>
								<span class="notification-text">
									<strong>Michael Lee</strong> liked your article
									<strong>“Intro to Web APIs”</strong>
								</span>
								<span class="notification-time">23 hours ago</span>
								<button class="notification-action">Delete</button>
							</li>
						</ul>
					</div>
					<div class="notification-group">
						<div class="notification-date-label">Earlier</div>
						<ul class="notification-items">
							<li class="notification-item">
								<span class="notification-icon">🛡️</span>
								<span class="notification-text">
									System: Security update applied successfully.
								</span>
								<span class="notification-time">2 days ago</span>
								<button class="notification-action">Delete</button>
							</li>
							<li class="notification-item">
								<span class="notification-icon">📦</span>
								<span class="notification-text">
									<strong>Backup completed</strong> for your content library.
								</span>
								<span class="notification-time">4 days ago</span>
								<button class="notification-action">Delete</button>
							</li>
						</ul>
					</div>
				</div>
				<div class="pagination">
					<button class="page-btn">&lt; Prev</button>
					<button class="page-btn active">1</button>
					<button class="page-btn">2</button>
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
	.filter-select,
	.sort-select {
		border: 2px solid #333;
		padding: 8px 12px;
		background: white;
	}
	.action-btn {
		border: 1px solid #333;
		padding: 7px 13px;
		background: white;
		cursor: pointer;
		font-size: 13px;
		border-radius: 4px;
	}
	.action-btn:hover {
		background: #f0f0f0;
	}
	.stats {
		font-size: 14px;
		color: #666;
	}
	.content {
		padding: 20px;
	}
	/* Notifications List */
	.notifications-list {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.notification-group {
		margin-bottom: 10px;
	}
	.notification-date-label {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
		padding-left: 6px;
	}
	.notification-items {
		list-style-type: none;
	}
	.notification-item {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 12px;
		padding: 12px 16px;
		border-left: 3px solid #333;
		background: #fafafa;
		position: relative;
		font-size: 14px;
		transition: background 0.2s;
	}
	.notification-item.unread {
		background: #eaf2ff;
		border-left: 3px solid #2361c8;
		font-weight: bold;
	}
	.notification-item.mention {
		border-left: 3px solid #ffb32a;
	}
	.notification-icon {
		font-size: 20px;
	}
	.notification-text {
		flex: 1;
		color: #555;
	}
	.notification-time {
		font-size: 12px;
		color: #888;
		min-width: 80px;
		text-align: right;
		margin-left: 12px;
	}
	.notification-action {
		border: none;
		background: none;
		color: #2361c8;
		font-size: 13px;
		margin-left: 8px;
		cursor: pointer;
		padding: 0 6px;
	}
	.notification-action:hover {
		text-decoration: underline;
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
		.notification-item {
			font-size: 13px;
			padding: 9px 7px;
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
