<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Table from '$lib/components/ui/table';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Tag,
		Plus,
		Search,
		Filter,
		MoreHorizontal,
		Edit,
		Trash2,
		TrendingUp,
		TrendingDown,
		Minus,
		Hash,
		Users,
		FileText,
		Calendar,
		Eye,
		Star
	} from '@lucide/svelte';

	// Static data for demonstration
	let tags = [
		{
			id: 1,
			name: 'JavaScript',
			description: 'Programming language for web development',
			color: '#f7df1e',
			articleCount: 45,
			followerCount: 1205,
			trending: 'up',
			isOfficial: true,
			isFollowing: true,
			createdDate: '2023-01-15',
			lastUsed: '2024-01-15'
		},
		{
			id: 2,
			name: 'React',
			description: 'A JavaScript library for building user interfaces',
			color: '#61dafb',
			articleCount: 38,
			followerCount: 892,
			trending: 'up',
			isOfficial: true,
			isFollowing: true,
			createdDate: '2023-02-10',
			lastUsed: '2024-01-14'
		},
		{
			id: 3,
			name: 'TypeScript',
			description: 'Typed superset of JavaScript',
			color: '#3178c6',
			articleCount: 32,
			followerCount: 756,
			trending: 'stable',
			isOfficial: true,
			isFollowing: false,
			createdDate: '2023-01-20',
			lastUsed: '2024-01-13'
		},
		{
			id: 4,
			name: 'Svelte',
			description: 'Cybernetically enhanced web apps',
			color: '#ff3e00',
			articleCount: 28,
			followerCount: 634,
			trending: 'up',
			isOfficial: true,
			isFollowing: true,
			createdDate: '2023-03-05',
			lastUsed: '2024-01-12'
		},
		{
			id: 5,
			name: 'Web Development',
			description: 'Building websites and web applications',
			color: '#6366f1',
			articleCount: 67,
			followerCount: 2340,
			trending: 'stable',
			isOfficial: false,
			isFollowing: false,
			createdDate: '2023-01-01',
			lastUsed: '2024-01-15'
		},
		{
			id: 6,
			name: 'Tutorial',
			description: 'Step-by-step learning content',
			color: '#10b981',
			articleCount: 89,
			followerCount: 1876,
			trending: 'down',
			isOfficial: false,
			isFollowing: true,
			createdDate: '2023-01-05',
			lastUsed: '2024-01-11'
		},
		{
			id: 7,
			name: 'CSS',
			description: 'Cascading Style Sheets for web styling',
			color: '#1572b6',
			articleCount: 23,
			followerCount: 543,
			trending: 'stable',
			isOfficial: true,
			isFollowing: false,
			createdDate: '2023-02-15',
			lastUsed: '2024-01-10'
		},
		{
			id: 8,
			name: 'Node.js',
			description: 'JavaScript runtime for server-side development',
			color: '#339933',
			articleCount: 41,
			followerCount: 987,
			trending: 'up',
			isOfficial: true,
			isFollowing: true,
			createdDate: '2023-01-25',
			lastUsed: '2024-01-09'
		}
	];

	let searchQuery = '';
	let filterBy = { value: 'all', label: 'All Tags' };
	let sortBy = { value: 'popularity', label: 'Popularity' };
	let showCreateDialog = false;
	let showEditDialog = false;
	let selectedTag: (typeof tags)[0] | null = null;
	let newTag = {
		name: '',
		description: '',
		color: '#6366f1'
	};

	const filterOptions = [
		{ value: 'all', label: 'All Tags' },
		{ value: 'following', label: 'Following' },
		{ value: 'official', label: 'Official' },
		{ value: 'trending', label: 'Trending' },
		{ value: 'my-tags', label: 'My Tags' }
	];

	const sortOptions = [
		{ value: 'popularity', label: 'Popularity' },
		{ value: 'name', label: 'Name' },
		{ value: 'articles', label: 'Article Count' },
		{ value: 'recent', label: 'Recently Used' },
		{ value: 'created', label: 'Date Created' }
	];

	// Computed properties for filtering and sorting
	$: filteredTags = tags
		.filter((tag) => {
			// Search filter
			const matchesSearch =
				tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				tag.description.toLowerCase().includes(searchQuery.toLowerCase());

			if (!matchesSearch) return false;

			// Category filter
			switch (filterBy.value) {
				case 'following':
					return tag.isFollowing;
				case 'official':
					return tag.isOfficial;
				case 'trending':
					return tag.trending === 'up';
				case 'my-tags':
					return !tag.isOfficial; // Assuming non-official tags are user-created
				default:
					return true;
			}
		})
		.sort((a, b) => {
			switch (sortBy.value) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'articles':
					return b.articleCount - a.articleCount;
				case 'recent':
					return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
				case 'created':
					return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				default: // popularity
					return b.followerCount - a.followerCount;
			}
		});

	function handleCreateTag() {
		if (newTag.name && newTag.description) {
			const tag = {
				id: Math.max(...tags.map((t) => t.id)) + 1,
				name: newTag.name,
				description: newTag.description,
				color: newTag.color,
				articleCount: 0,
				followerCount: 1,
				trending: 'stable' as const,
				isOfficial: false,
				isFollowing: true,
				createdDate: new Date().toISOString().split('T')[0],
				lastUsed: new Date().toISOString().split('T')[0]
			};
			tags = [...tags, tag];
			newTag = { name: '', description: '', color: '#6366f1' };
			showCreateDialog = false;
		}
	}

	function handleEditTag() {
		if (selectedTag) {
			const index = tags.findIndex((t) => t.id === selectedTag?.id);
			if (index !== -1) {
				tags[index] = { ...selectedTag };
				tags = [...tags];
			}
			showEditDialog = false;
			selectedTag = null;
		}
	}

	function handleDeleteTag(tagId: number) {
		tags = tags.filter((t) => t.id !== tagId);
	}

	function handleFollowTag(tagId: number) {
		const index = tags.findIndex((t) => t.id === tagId);
		if (index !== -1) {
			tags[index].isFollowing = !tags[index].isFollowing;
			tags[index].followerCount += tags[index].isFollowing ? 1 : -1;
			tags = [...tags];
		}
	}

	function openEditDialog(tag: (typeof tags)[0]) {
		selectedTag = { ...tag };
		showEditDialog = true;
	}

	function getTrendingIcon(trend: string) {
		switch (trend) {
			case 'up':
				return TrendingUp;
			case 'down':
				return TrendingDown;
			default:
				return Minus;
		}
	}

	function getTrendingColor(trend: string) {
		switch (trend) {
			case 'up':
				return 'text-green-500';
			case 'down':
				return 'text-red-500';
			default:
				return 'text-gray-500';
		}
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Manage Tags</h2>
			<p class="text-muted-foreground">
				Create, edit, and organize tags for better content discovery
			</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button onclick={() => (showCreateDialog = true)}>
				<Plus class="mr-2 h-4 w-4" />
				Create Tag
			</Button>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid gap-4 md:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Tags</CardTitle>
				<Hash class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{tags.length}</div>
				<p class="text-muted-foreground text-xs">
					{tags.filter((t) => !t.isOfficial).length} custom tags
				</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Following</CardTitle>
				<Users class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{tags.filter((t) => t.isFollowing).length}</div>
				<p class="text-muted-foreground text-xs">Tags you're following</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Articles</CardTitle>
				<FileText class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{tags.reduce((sum, tag) => sum + tag.articleCount, 0)}</div>
				<p class="text-muted-foreground text-xs">Across all tags</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Trending</CardTitle>
				<TrendingUp class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{tags.filter((t) => t.trending === 'up').length}</div>
				<p class="text-muted-foreground text-xs">Tags trending up</p>
			</CardContent>
		</Card>
	</div>

	<!-- Filters and Search -->
	<Card>
		<CardHeader>
			<CardTitle>Browse Tags</CardTitle>
			<CardDescription>Search, filter, and manage all available tags</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="mb-6 flex flex-col gap-4 md:flex-row">
				<div class="flex-1">
					<div class="relative">
						<Search class="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
						<Input placeholder="Search tags..." bind:value={searchQuery} class="pl-8" />
					</div>
				</div>
				<div class="flex gap-2">
					<Select.Root type="single">
						<Select.Trigger class="w-[140px]">
							<Filter class="mr-2 h-4 w-4" />
							<!-- <Select.Value /> -->
						</Select.Trigger>
						<Select.Content>
							{#each filterOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root type="single">
						<Select.Trigger class="w-[140px]">
							<!-- <Select.Value /> -->
						</Select.Trigger>
						<Select.Content>
							{#each sortOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<!-- Tags Table -->
			<div class="rounded-md border">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Tag</Table.Head>
							<Table.Head>Articles</Table.Head>
							<Table.Head>Followers</Table.Head>
							<Table.Head>Trend</Table.Head>
							<Table.Head>Last Used</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each filteredTags as tag}
							<Table.Row>
								<Table.Cell>
									<div class="flex items-center gap-3">
										<div
											class="h-4 w-4 rounded-full border"
											style="background-color: {tag.color}"
										></div>
										<div>
											<div class="flex items-center gap-2">
												<span class="font-medium">{tag.name}</span>
												{#if tag.isOfficial}
													<Badge variant="secondary" class="text-xs">
														<Star class="mr-1 h-3 w-3" />
														Official
													</Badge>
												{/if}
												{#if tag.isFollowing}
													<Badge variant="outline" class="text-xs">
														<Eye class="mr-1 h-3 w-3" />
														Following
													</Badge>
												{/if}
											</div>
											<p class="text-muted-foreground text-sm">{tag.description}</p>
										</div>
									</div>
								</Table.Cell>
								<Table.Cell>
									<div class="flex items-center gap-1">
										<FileText class="text-muted-foreground h-4 w-4" />
										{tag.articleCount}
									</div>
								</Table.Cell>
								<Table.Cell>
									<div class="flex items-center gap-1">
										<Users class="text-muted-foreground h-4 w-4" />
										{tag.followerCount.toLocaleString()}
									</div>
								</Table.Cell>
								<Table.Cell>
									{@const TrendIcon = getTrendingIcon(tag.trending)}
									<div class="flex items-center gap-1 {getTrendingColor(tag.trending)}">
										<TrendIcon class="h-4 w-4" />
										<span class="text-sm capitalize">{tag.trending}</span>
									</div>
								</Table.Cell>
								<Table.Cell>
									<div class="text-muted-foreground flex items-center gap-1 text-sm">
										<Calendar class="h-4 w-4" />
										{new Date(tag.lastUsed).toLocaleDateString()}
									</div>
								</Table.Cell>
								<Table.Cell class="text-right">
									<div class="flex items-center justify-end gap-2">
										<Button variant="outline" size="sm" onclick={() => handleFollowTag(tag.id)}>
											{tag.isFollowing ? 'Unfollow' : 'Follow'}
										</Button>
										{#if !tag.isOfficial}
											<Button variant="ghost" size="sm" onclick={() => openEditDialog(tag)}>
												<Edit class="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm" onclick={() => handleDeleteTag(tag.id)}>
												<Trash2 class="h-4 w-4" />
											</Button>
										{/if}
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>

			{#if filteredTags.length === 0}
				<div class="text-muted-foreground py-8 text-center">
					<Hash class="mx-auto mb-4 h-12 w-12 opacity-50" />
					<p>No tags found matching your criteria.</p>
					<Button variant="outline" onclick={() => (showCreateDialog = true)} class="mt-4">
						<Plus class="mr-2 h-4 w-4" />
						Create New Tag
					</Button>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>

<!-- Create Tag Dialog -->
<Dialog.Root bind:open={showCreateDialog}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New Tag</Dialog.Title>
			<Dialog.Description>
				Add a new tag to help categorize and organize content.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="space-y-2">
				<Label for="name">Tag Name</Label>
				<Input id="name" bind:value={newTag.name} placeholder="Enter tag name" />
			</div>
			<div class="space-y-2">
				<Label for="description">Description</Label>
				<Input
					id="description"
					bind:value={newTag.description}
					placeholder="Brief description of the tag"
				/>
			</div>
			<div class="space-y-2">
				<Label for="color">Color</Label>
				<div class="flex items-center gap-2">
					<input
						id="color"
						type="color"
						bind:value={newTag.color}
						class="h-10 w-12 rounded border"
					/>
					<Input bind:value={newTag.color} placeholder="#6366f1" class="flex-1" />
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showCreateDialog = false)}>Cancel</Button>
			<Button onclick={handleCreateTag} disabled={!newTag.name || !newTag.description}>
				Create Tag
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Tag Dialog -->
<Dialog.Root bind:open={showEditDialog}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Tag</Dialog.Title>
			<Dialog.Description>Update the tag information.</Dialog.Description>
		</Dialog.Header>
		{#if selectedTag}
			<div class="grid gap-4 py-4">
				<div class="space-y-2">
					<Label for="edit-name">Tag Name</Label>
					<Input id="edit-name" bind:value={selectedTag.name} placeholder="Enter tag name" />
				</div>
				<div class="space-y-2">
					<Label for="edit-description">Description</Label>
					<Input
						id="edit-description"
						bind:value={selectedTag.description}
						placeholder="Brief description of the tag"
					/>
				</div>
				<div class="space-y-2">
					<Label for="edit-color">Color</Label>
					<div class="flex items-center gap-2">
						<input
							id="edit-color"
							type="color"
							bind:value={selectedTag.color}
							class="h-10 w-12 rounded border"
						/>
						<Input bind:value={selectedTag.color} placeholder="#6366f1" class="flex-1" />
					</div>
				</div>
			</div>
		{/if}
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showEditDialog = false)}>Cancel</Button>
			<Button onclick={handleEditTag}>Save Changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
