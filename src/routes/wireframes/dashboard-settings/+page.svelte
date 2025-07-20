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
					<a href="#" class="nav-item active">
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
					<div class="breadcrumb">Dashboard &gt; Settings</div>
					<h1 class="page-title">Settings</h1>
				</div>
				<button class="create-btn" disabled style="opacity: 0.5; cursor: default;">&nbsp;</button>
			</div>

			<div class="controls" style="border-bottom: none;">
				<div class="left-controls" style="gap: 0;">
					<!-- No search, filter or sort for settings -->
				</div>
			</div>

			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Account and application settings
			</div>

			<div class="content">
				<div class="settings-panel">
					<div class="settings-section">
						<div class="settings-title">Profile Settings</div>
						<div class="settings-group">
							<label class="settings-label" for="username">Username</label>
							<div class="settings-input">John Doe</div>
						</div>
						<div class="settings-group">
							<label class="settings-label" for="email">Email</label>
							<div class="settings-input">john@example.com</div>
						</div>
						<button class="action-btn" style="margin-top:10px;">Edit Profile</button>
					</div>

					<div class="settings-section">
						<div class="settings-title">Security</div>
						<div class="settings-group">
							<label class="settings-label">Password</label>
							<div class="settings-input">••••••••</div>
						</div>
						<div class="settings-group">
							<label class="settings-label">Two-Factor Authentication</label>
							<div class="settings-input">Enabled</div>
						</div>
						<button class="action-btn" style="margin-top:10px;">Change Password</button>
					</div>

					<div class="settings-section">
						<div class="settings-title">Preferences</div>
						<div class="settings-group">
							<label class="settings-label">Theme</label>
							<div class="settings-input">Light</div>
						</div>
						<div class="settings-group">
							<label class="settings-label">Language</label>
							<div class="settings-input">English</div>
						</div>
						<button class="action-btn" style="margin-top:10px;">Edit Preferences</button>
					</div>

					<div class="settings-section">
						<div class="settings-title">Notifications</div>
						<div class="settings-group">
							<label class="settings-label">Email Notifications</label>
							<div class="settings-input">On</div>
						</div>
						<div class="settings-group">
							<label class="settings-label">Push Notifications</label>
							<div class="settings-input">Off</div>
						</div>
						<button class="action-btn" style="margin-top:10px;">Manage Notifications</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

<style>
	/* Use the SAME shared wireframe CSS as your reference layout above */
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

	.stats {
		font-size: 14px;
		color: #666;
	}

	.content {
		padding: 20px;
	}

	/* SETTINGS PANEL WIREFRAME */
	.settings-panel {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	.settings-section {
		border: 2px solid #333;
		background: #fcfcfc;
		padding: 24px 20px 20px 20px;
		margin-bottom: 20px;
		min-width: 270px;
	}

	.settings-title {
		font-size: 18px;
		font-weight: bold;
		border-bottom: 1.5px solid #333;
		margin-bottom: 18px;
		padding-bottom: 10px;
	}

	.settings-group {
		margin-bottom: 15px;
	}

	.settings-label {
		display: block;
		font-size: 13px;
		color: #444;
		margin-bottom: 4px;
		font-weight: bold;
	}

	.settings-input {
		padding: 8px 12px;
		background: #ededed;
		border: 1px solid #bbb;
		border-radius: 4px;
		font-size: 14px;
		color: #333;
		min-height: 22px;
	}

	.action-btn {
		border: 1px solid #333;
		padding: 6px 12px;
		background: white;
		cursor: pointer;
		font-size: 13px;
		margin-right: 8px;
	}

	.action-btn:hover {
		background: #f0f0f0;
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
		.settings-panel {
			grid-template-columns: 1fr;
			gap: 25px;
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
		.settings-panel {
			grid-template-columns: 1fr;
			gap: 20px;
		}
	}
</style>
