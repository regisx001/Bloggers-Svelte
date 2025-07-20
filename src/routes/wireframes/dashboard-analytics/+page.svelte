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
					<a href="#" class="nav-item active">
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
			</nav>
		</div>
		<!-- Main Content -->
		<div class="main-content">
			<div class="header">
				<div>
					<div class="breadcrumb">Dashboard &gt; Analytics</div>
					<h1 class="page-title">Analytics</h1>
				</div>
				<button class="create-btn" disabled style="opacity: 0.5; cursor: default;">&nbsp;</button>
			</div>
			<div class="controls">
				<div class="left-controls">
					<select class="filter-select">
						<option>This Month</option>
						<option>Last Month</option>
						<option>This Year</option>
						<option>Custom Range</option>
					</select>
					<select class="sort-select">
						<option>Sort by: Views</option>
						<option>Sort by: Likes</option>
						<option>Sort by: Comments</option>
						<option>Sort by: Shares</option>
					</select>
				</div>
				<div class="view-toggle">
					<button class="view-btn active">Graph</button>
					<button class="view-btn">Table</button>
				</div>
			</div>
			<div class="stats" style="padding: 0 20px; color: #666; font-size: 14px;">
				Key analytics for your articles and content
			</div>
			<div class="content">
				<div class="analytics-dashboard">
					<!-- High level stats -->
					<div class="analytics-cards">
						<div class="analytics-card">
							<div class="analytics-card-label">Total Views</div>
							<div class="analytics-card-value">18,237</div>
						</div>
						<div class="analytics-card">
							<div class="analytics-card-label">Unique Visitors</div>
							<div class="analytics-card-value">9,412</div>
						</div>
						<div class="analytics-card">
							<div class="analytics-card-label">Likes</div>
							<div class="analytics-card-value">1,247</div>
						</div>
						<div class="analytics-card">
							<div class="analytics-card-label">Comments</div>
							<div class="analytics-card-value">328</div>
						</div>
					</div>
					<!-- Graph Wireframe -->
					<div class="analytics-graph-placeholder">
						<div class="graph-label">[Line/Bar Chart Placeholder]</div>
					</div>
					<!-- Table Wireframe, shown on 'Table' mode -->
					<div class="analytics-table-placeholder">
						<div class="table-label">[Table View Placeholder]</div>
						<table class="analytics-table">
							<thead>
								<tr>
									<th>Article</th>
									<th>Views</th>
									<th>Likes</th>
									<th>Comments</th>
									<th>Shares</th>
									<th>CTR</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Getting Started with React Hooks</td>
									<td>4,003</td>
									<td>253</td>
									<td>52</td>
									<td>14</td>
									<td>5.1%</td>
								</tr>
								<tr>
									<td>Advanced CSS Grid Techniques</td>
									<td>1,897</td>
									<td>144</td>
									<td>24</td>
									<td>8</td>
									<td>4.2%</td>
								</tr>
								<tr>
									<td>Building Responsive Layouts</td>
									<td>2,002</td>
									<td>197</td>
									<td>38</td>
									<td>11</td>
									<td>4.6%</td>
								</tr>
								<!-- ...more rows as needed -->
							</tbody>
						</table>
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
	.analytics-dashboard {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.analytics-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 24px;
		margin-bottom: 18px;
	}
	.analytics-card {
		border: 2px solid #333;
		background: #fcfcfc;
		padding: 28px 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 140px;
	}
	.analytics-card-label {
		font-size: 14px;
		color: #666;
		margin-bottom: 10px;
	}
	.analytics-card-value {
		font-size: 26px;
		font-weight: bold;
		color: #222;
	}
	.analytics-graph-placeholder {
		border: 2px dashed #999;
		background: #fafafa;
		height: 240px;
		margin-bottom: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.graph-label {
		color: #aaa;
		font-size: 18px;
		font-style: italic;
	}
	.analytics-table-placeholder {
		border: 2px dashed #999;
		background: #fafafa;
		padding: 22px 10px 18px 10px;
		margin-top: 18px;
		margin-bottom: 10px;
	}
	.table-label {
		color: #aaa;
		font-size: 16px;
		font-style: italic;
		margin-bottom: 14px;
	}
	.analytics-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 10px;
	}
	.analytics-table th,
	.analytics-table td {
		border: 1px solid #bbb;
		padding: 6px 10px;
		font-size: 13px;
		text-align: left;
	}
	.analytics-table th {
		background: #f4f4f4;
		color: #444;
		font-weight: bold;
	}
	.analytics-table td {
		background: #fff;
		color: #444;
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
		.analytics-cards {
			grid-template-columns: 1fr 1fr;
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
		.analytics-cards {
			grid-template-columns: 1fr;
			gap: 14px;
		}
	}
</style>
