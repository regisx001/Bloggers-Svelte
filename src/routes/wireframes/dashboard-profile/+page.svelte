<body>
	<div class="wireframe">
		<div class="wireframe-label">WIREFRAME</div>

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
					<a href="#" class="nav-item active">
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

		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard > Settings</div>
					<h1 class="page-title">Profile</h1>
				</div>
				<button class="save-btn">Save Changes</button>
			</div>

			<div class="content">
				<div class="profile-layout">
					<div class="profile-sidebar">
						<!-- Avatar Section -->
						<div class="card">
							<h2 class="card-title">Profile Picture</h2>
							<div class="avatar-section">
								<div class="avatar">👤</div>
								<div>John Doe</div>
								<button class="upload-btn">Upload New Photo</button>
								<button class="upload-btn">Remove Photo</button>
							</div>
						</div>

						<!-- Stats Section -->
						<div class="card">
							<h2 class="card-title">Account Stats</h2>
							<div class="stats-grid">
								<div class="stat-item">
									<div class="stat-number">47</div>
									<div class="stat-label">Articles</div>
								</div>
								<div class="stat-item">
									<div class="stat-number">12</div>
									<div class="stat-label">Drafts</div>
								</div>
								<div class="stat-item">
									<div class="stat-number">2.4K</div>
									<div class="stat-label">Total Views</div>
								</div>
								<div class="stat-item">
									<div class="stat-number">156</div>
									<div class="stat-label">This Month</div>
								</div>
							</div>
						</div>

						<!-- Quick Actions -->
						<div class="card">
							<h2 class="card-title">Quick Actions</h2>
							<button class="upload-btn" style="width: 100%; margin-bottom: 10px;"
								>Change Password</button
							>
							<button class="upload-btn" style="width: 100%; margin-bottom: 10px;"
								>Export Data</button
							>
							<button class="upload-btn" style="width: 100%;">Download Backup</button>
						</div>
					</div>

					<div class="profile-main">
						<!-- Personal Information -->
						<div class="card">
							<h2 class="card-title">Personal Information</h2>
							<div class="form-row">
								<div class="form-group">
									<label class="form-label">First Name *</label>
									<input
										type="text"
										class="form-input"
										value="John"
										placeholder="Enter first name"
									/>
								</div>
								<div class="form-group">
									<label class="form-label">Last Name *</label>
									<input type="text" class="form-input" value="Doe" placeholder="Enter last name" />
								</div>
							</div>
							<div class="form-group">
								<label class="form-label">Email Address *</label>
								<input
									type="email"
									class="form-input"
									value="john.doe@example.com"
									placeholder="Enter email address"
								/>
								<div class="form-help">This email will be used for account notifications</div>
							</div>
							<div class="form-group">
								<label class="form-label">Phone Number</label>
								<input
									type="tel"
									class="form-input"
									value="+1 (555) 123-4567"
									placeholder="Enter phone number"
								/>
							</div>
							<div class="form-group">
								<label class="form-label">Bio</label>
								<textarea class="form-textarea" placeholder="Tell us about yourself..."
									>Content creator and web developer with 5+ years of experience in modern web
									technologies.</textarea
								>
							</div>
						</div>

						<!-- Professional Information -->
						<div class="card">
							<h2 class="card-title">Professional Information</h2>
							<div class="form-row">
								<div class="form-group">
									<label class="form-label">Job Title</label>
									<input
										type="text"
										class="form-input"
										value="Senior Frontend Developer"
										placeholder="Enter job title"
									/>
								</div>
								<div class="form-group">
									<label class="form-label">Company</label>
									<input
										type="text"
										class="form-input"
										value="Tech Solutions Inc."
										placeholder="Enter company name"
									/>
								</div>
							</div>
							<div class="form-group">
								<label class="form-label">Website</label>
								<input
									type="url"
									class="form-input"
									value="https://johndoe.dev"
									placeholder="Enter website URL"
								/>
							</div>
							<div class="form-row">
								<div class="form-group">
									<label class="form-label">LinkedIn</label>
									<input
										type="url"
										class="form-input"
										value="https://linkedin.com/in/johndoe"
										placeholder="LinkedIn profile URL"
									/>
								</div>
								<div class="form-group">
									<label class="form-label">Twitter</label>
									<input
										type="text"
										class="form-input"
										value="@johndoe"
										placeholder="Twitter handle"
									/>
								</div>
							</div>
						</div>

						<!-- Notification Preferences -->
						<div class="card">
							<h2 class="card-title">Notification Preferences</h2>
							<div class="toggle-switch">
								<div class="switch active">
									<div class="switch-slider"></div>
								</div>
								<div>
									<strong>Email Notifications</strong>
									<div class="form-help">Receive email notifications for important updates</div>
								</div>
							</div>
							<div class="toggle-switch">
								<div class="switch">
									<div class="switch-slider"></div>
								</div>
								<div>
									<strong>Marketing Emails</strong>
									<div class="form-help">Receive promotional emails and newsletters</div>
								</div>
							</div>
							<div class="toggle-switch">
								<div class="switch active">
									<div class="switch-slider"></div>
								</div>
								<div>
									<strong>Article Comments</strong>
									<div class="form-help">Get notified when someone comments on your articles</div>
								</div>
							</div>
							<div class="toggle-switch">
								<div class="switch active">
									<div class="switch-slider"></div>
								</div>
								<div>
									<strong>Weekly Summary</strong>
									<div class="form-help">Receive weekly performance summaries</div>
								</div>
							</div>
						</div>

						<!-- Danger Zone -->
						<div class="card danger-zone">
							<h2 class="card-title">Danger Zone</h2>
							<p style="margin-bottom: 20px; color: #666;">
								These actions cannot be undone. Please proceed with caution.
							</p>
							<div style="display: flex; gap: 15px; flex-wrap: wrap;">
								<button class="danger-btn">Deactivate Account</button>
								<button class="danger-btn">Delete Account</button>
							</div>
						</div>
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

	.save-btn {
		border: 2px solid #333;
		padding: 12px 24px;
		background: #333;
		color: white;
		cursor: pointer;
		font-weight: bold;
	}

	.save-btn:hover {
		background: #555;
	}

	.content {
		padding: 30px;
		flex: 1;
		overflow-y: auto;
	}

	.profile-layout {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 30px;
		max-width: 1200px;
	}

	.profile-sidebar {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.profile-main {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.card {
		border: 2px solid #333;
		background: white;
		padding: 25px;
	}

	.card-title {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 20px;
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
	}

	.avatar-section {
		text-align: center;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border: 3px solid #333;
		margin: 0 auto 15px;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 48px;
		color: #666;
	}

	.upload-btn {
		border: 1px solid #333;
		padding: 8px 16px;
		background: white;
		cursor: pointer;
		font-size: 14px;
		margin-top: 10px;
	}

	.upload-btn:hover {
		background: #f0f0f0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
		margin-top: 20px;
	}

	.stat-item {
		text-align: center;
		padding: 15px;
		border: 1px solid #ddd;
	}

	.stat-number {
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}

	.stat-label {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-label {
		display: block;
		font-weight: bold;
		margin-bottom: 8px;
		font-size: 14px;
	}

	.form-input,
	.form-textarea,
	.form-select {
		width: 100%;
		border: 2px solid #333;
		padding: 12px;
		font-size: 14px;
		background: white;
	}

	.form-input:focus,
	.form-textarea:focus,
	.form-select:focus {
		outline: none;
		border-color: #555;
	}

	.form-textarea {
		height: 100px;
		resize: vertical;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.form-help {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.toggle-switch {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 15px;
	}

	.switch {
		position: relative;
		width: 50px;
		height: 24px;
		border: 2px solid #333;
		background: white;
		cursor: pointer;
	}

	.switch-slider {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 18px;
		height: 18px;
		background: #333;
		transition: transform 0.2s;
	}

	.switch.active .switch-slider {
		transform: translateX(24px);
	}

	.switch.active {
		background: #333;
	}

	.danger-zone {
		border-color: #dc2626;
	}

	.danger-zone .card-title {
		color: #dc2626;
	}

	.danger-btn {
		border: 2px solid #dc2626;
		padding: 10px 20px;
		background: white;
		color: #dc2626;
		cursor: pointer;
		font-weight: bold;
	}

	.danger-btn:hover {
		background: #dc2626;
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

	@media (max-width: 768px) {
		.wireframe {
			flex-direction: column;
		}

		.sidebar {
			width: 100%;
		}

		.profile-layout {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
