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
					<a href="#" class="nav-item active">
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
			</nav>
		</div>

		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard > Content Management</div>
					<h1 class="page-title">My Articles</h1>
				</div>
				<button class="create-btn">+ Create New Article</button>
			</div>

			<div class="controls">
				<div class="left-controls">
					<input type="text" class="search-box" placeholder="Search articles..." />
					<select class="filter-select">
						<option>All Status</option>
						<option>Published</option>
						<option>Draft</option>
						<option>Archived</option>
					</select>
					<select class="sort-select">
						<option>Sort by: Latest</option>
						<option>Sort by: Title</option>
						<option>Sort by: Views</option>
						<option>Sort by: Status</option>
					</select>
				</div>
				<div class="view-toggle">
					<button class="view-btn active">Grid</button>
					<button class="view-btn">List</button>
				</div>
			</div>

			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Showing 12 of 47 articles
			</div>

			<div class="content">
				<div class="article-grid">
					<div class="article-card">
						<div class="article-status status-published">Published</div>
						<h3 class="article-title">Getting Started with React Hooks</h3>
						<p class="article-excerpt">
							A comprehensive guide to understanding and implementing React Hooks in your
							applications. Learn the basics and advanced patterns...
						</p>
						<div class="article-meta">
							<span>Created: Mar 15, 2024</span>
							<span>Views: 1,247</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Edit</button>
							<button class="action-btn">View</button>
							<button class="action-btn">Stats</button>
							<button class="action-btn">•••</button>
						</div>
					</div>

					<div class="article-card">
						<div class="article-status status-draft">Draft</div>
						<h3 class="article-title">Advanced CSS Grid Techniques</h3>
						<p class="article-excerpt">
							Exploring advanced CSS Grid layouts and responsive design patterns that will elevate
							your web development skills...
						</p>
						<div class="article-meta">
							<span>Created: Jul 10, 2024</span>
							<span>Views: 0</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Edit</button>
							<button class="action-btn">Preview</button>
							<button class="action-btn">Publish</button>
							<button class="action-btn">•••</button>
						</div>
					</div>

					<div class="article-card">
						<div class="article-status status-published">Published</div>
						<h3 class="article-title">JavaScript Performance Optimization</h3>
						<p class="article-excerpt">
							Tips and techniques for optimizing JavaScript performance in modern web applications.
							From code splitting to lazy loading...
						</p>
						<div class="article-meta">
							<span>Created: Feb 28, 2024</span>
							<span>Views: 892</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Edit</button>
							<button class="action-btn">View</button>
							<button class="action-btn">Stats</button>
							<button class="action-btn">•••</button>
						</div>
					</div>

					<div class="article-card">
						<div class="article-status status-archived">Archived</div>
						<h3 class="article-title">Introduction to Web APIs</h3>
						<p class="article-excerpt">
							Understanding how to work with various Web APIs including Fetch, Local Storage, and
							Geolocation in your web projects...
						</p>
						<div class="article-meta">
							<span>Created: Jan 12, 2024</span>
							<span>Views: 543</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Restore</button>
							<button class="action-btn">View</button>
							<button class="action-btn">Delete</button>
							<button class="action-btn">•••</button>
						</div>
					</div>

					<div class="article-card">
						<div class="article-status status-published">Published</div>
						<h3 class="article-title">Building Responsive Layouts</h3>
						<p class="article-excerpt">
							Master the art of creating responsive web layouts using modern CSS techniques
							including Flexbox, Grid, and container queries...
						</p>
						<div class="article-meta">
							<span>Created: Apr 22, 2024</span>
							<span>Views: 1,156</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Edit</button>
							<button class="action-btn">View</button>
							<button class="action-btn">Stats</button>
							<button class="action-btn">•••</button>
						</div>
					</div>

					<div class="article-card">
						<div class="article-status status-draft">Draft</div>
						<h3 class="article-title">Node.js Best Practices</h3>
						<p class="article-excerpt">
							Essential best practices for Node.js development including error handling, security
							considerations, and performance optimization...
						</p>
						<div class="article-meta">
							<span>Created: Jun 30, 2024</span>
							<span>Views: 0</span>
						</div>
						<div class="article-actions">
							<button class="action-btn">Edit</button>
							<button class="action-btn">Preview</button>
							<button class="action-btn">Publish</button>
							<button class="action-btn">•••</button>
						</div>
					</div>
				</div>

				<div class="pagination">
					<button class="page-btn">‹ Prev</button>
					<button class="page-btn active">1</button>
					<button class="page-btn">2</button>
					<button class="page-btn">3</button>
					<button class="page-btn">4</button>
					<button class="page-btn">Next ›</button>
				</div>
			</div>
		</div>
	</div></body
>

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
	.filter-select,
	.sort-select {
		border: 2px solid #333;
		padding: 8px 12px;
		background: white;
	}

	.search-box {
		width: 250px;
	}

	.view-toggle {
		display: flex;
		border: 2px solid #333;
	}

	.view-btn {
		padding: 8px 12px;
		background: white;
		border: none;
		cursor: pointer;
		border-right: 1px solid #333;
	}

	.view-btn:last-child {
		border-right: none;
	}

	.view-btn.active {
		background: #333;
		color: white;
	}

	.stats {
		font-size: 14px;
		color: #666;
	}

	.content {
		padding: 20px;
	}

	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}

	.article-card {
		border: 2px solid #333;
		padding: 20px;
		background: white;
		position: relative;
	}

	.article-status {
		position: absolute;
		top: 15px;
		right: 15px;
		padding: 4px 8px;
		border: 1px solid #333;
		font-size: 12px;
		font-weight: bold;
	}

	.status-published {
		background: #e8f5e8;
	}
	.status-draft {
		background: #fff3cd;
	}
	.status-archived {
		background: #f8d7da;
	}

	.article-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		padding-right: 80px;
	}

	.article-excerpt {
		color: #666;
		font-size: 14px;
		line-height: 1.4;
		margin-bottom: 15px;
	}

	.article-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #888;
		margin-bottom: 15px;
	}

	.article-actions {
		display: flex;
		gap: 10px;
	}

	.action-btn {
		border: 1px solid #333;
		padding: 6px 12px;
		background: white;
		cursor: pointer;
		font-size: 12px;
	}

	.action-btn:hover {
		background: #f0f0f0;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-top: 40px;
		padding-top: 20px;
		border-top: 1px solid #ddd;
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

		.search-box {
			width: 100%;
		}

		.article-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
