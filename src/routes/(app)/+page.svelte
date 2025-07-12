<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		Search,
		Calendar,
		User,
		Clock,
		ArrowRight,
		TrendingUp,
		BookOpen,
		Star,
		Eye,
		Sparkles,
		Heart,
		Share2,
		Bookmark
	} from '@lucide/svelte';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import Footer from '$lib/components/app/footer.svelte';

	let { data }: PageProps = $props();
	let searchQuery = $state('');

	// Mock data for featured articles (replace with real data from your API)
	const featuredArticles = [
		{
			id: '1',
			title: 'Getting Started with SvelteKit 5: A Complete Guide',
			description:
				'Learn how to build modern web applications with the latest features in SvelteKit 5, including the new reactivity system and enhanced performance.',
			image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop',
			author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
			category: { title: 'Web Development', color: 'bg-blue-100 text-blue-800' },
			tags: ['svelte', 'web-dev', 'tutorial'],
			publishedAt: '2025-01-10T10:00:00Z',
			readTime: '8 min read',
			views: 1250
		},
		{
			id: '2',
			title: 'Building Scalable APIs with Modern Architecture',
			description:
				'Explore best practices for creating robust, scalable APIs using microservices architecture and cloud-native technologies.',
			image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop',
			author: { name: 'Sarah Wilson', avatar: 'https://github.com/shadcn.png' },
			category: { title: 'Backend', color: 'bg-green-100 text-green-800' },
			tags: ['api', 'microservices', 'architecture'],
			publishedAt: '2025-01-08T14:30:00Z',
			readTime: '12 min read',
			views: 892
		},
		{
			id: '3',
			title: "The Future of JavaScript: What's Coming in 2025",
			description:
				'A deep dive into the latest JavaScript features, frameworks, and trends that will shape web development in 2025.',
			image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop',
			author: { name: 'Mike Chen', avatar: 'https://github.com/shadcn.png' },
			category: { title: 'JavaScript', color: 'bg-yellow-100 text-yellow-800' },
			tags: ['javascript', 'trends', 'future'],
			publishedAt: '2025-01-05T09:15:00Z',
			readTime: '6 min read',
			views: 2100
		}
	];

	const popularCategories = [
		{ name: 'Web Development', count: 45, color: 'bg-blue-100 text-blue-800' },
		{ name: 'JavaScript', count: 32, color: 'bg-yellow-100 text-yellow-800' },
		{ name: 'Backend', count: 28, color: 'bg-green-100 text-green-800' },
		{ name: 'Design', count: 21, color: 'bg-purple-100 text-purple-800' },
		{ name: 'DevOps', count: 18, color: 'bg-red-100 text-red-800' },
		{ name: 'Mobile', count: 15, color: 'bg-indigo-100 text-indigo-800' }
	];

	const stats = [
		{ label: 'Articles Published', value: '240+', icon: BookOpen },
		{ label: 'Active Readers', value: '12K+', icon: User },
		{ label: 'Categories', value: '20+', icon: Star }
	];

	// Recent trending articles
	const trendingArticles = [
		{
			id: '4',
			title: 'Building Real-time Chat with WebSockets',
			readTime: '10 min read',
			views: 3200,
			isHot: true
		},
		{
			id: '5',
			title: 'Advanced TypeScript Patterns',
			readTime: '15 min read',
			views: 2800,
			isHot: true
		},
		{
			id: '6',
			title: 'Deploying with Docker & Kubernetes',
			readTime: '12 min read',
			views: 2100,
			isHot: false
		},
		{
			id: '7',
			title: 'CSS Grid vs Flexbox: When to Use What',
			readTime: '8 min read',
			views: 1900,
			isHot: false
		}
	];
</script>

<div class="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
	<!-- Hero Section -->
	<section class="relative py-16 pt-16">
		<div class="bg-grid-white/[0.02] absolute inset-0 bg-[size:60px_60px]"></div>
		<div class="relative container mx-auto px-4">
			<div class="mx-auto max-w-3xl text-center">
				<!-- Welcome Badge -->
				<div
					class="bg-primary/10 text-primary mb-8 inline-flex items-center rounded-full px-4 py-2 text-sm"
				>
					<Sparkles class="mr-2 h-4 w-4" />
					Welcome to our blog community
				</div>

				<!-- Main Heading -->
				<h1 class="mb-6 text-6xl font-bold tracking-tight lg:text-8xl">
					Discover Amazing
					<span class="text-primary">Stories</span>
				</h1>

				<!-- Subtitle -->
				<p class="text-muted-foreground mb-12 text-xl lg:text-2xl">
					Explore insightful articles, tutorials, and thoughts from passionate writers and
					developers around the world.
				</p>

				<!-- Search Bar -->
				<div class="mx-auto mb-8 max-w-lg">
					<div class="relative">
						<Search
							class="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
						/>
						<Input
							bind:value={searchQuery}
							placeholder="Search articles, tutorials, guides..."
							class="h-14 border-2 pr-4 pl-12 text-lg"
						/>
						{#if searchQuery}
							<Button size="sm" class="absolute top-1/2 right-2 h-10 -translate-y-1/2">
								Search
							</Button>
						{/if}
					</div>

					<!-- Popular Tags -->
					<div class="mt-4 flex flex-wrap items-center justify-center gap-2">
						<span class="text-muted-foreground text-sm">Popular:</span>
						<Badge
							variant="outline"
							class="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
							>#webdev</Badge
						>
						<Badge
							variant="outline"
							class="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
							>#javascript</Badge
						>
						<Badge
							variant="outline"
							class="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
							>#tutorial</Badge
						>
						<Badge
							variant="outline"
							class="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
							>#design</Badge
						>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
					<Button size="lg" class="h-14 px-8 py-4 text-lg">
						Start Reading
						<ArrowRight class="ml-2 h-5 w-5" />
					</Button>
					<Button variant="outline" size="lg" class="h-14 px-8 py-4 text-lg">
						Browse Categories
					</Button>
				</div>

				<!-- Stats Section -->
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
					{#each stats as stat}
						<div class="text-center">
							<div class="bg-primary/10 mx-auto mb-3 w-fit rounded-lg p-3">
								<stat.icon class="text-primary h-8 w-8" />
							</div>
							<div class="text-3xl font-bold">{stat.value}</div>
							<div class="text-muted-foreground">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Articles -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 flex items-center justify-between">
				<div>
					<h2 class="text-3xl font-bold tracking-tight">Featured Articles</h2>
					<p class="text-muted-foreground">Our most popular and trending content</p>
				</div>
				<Button variant="outline">
					View All
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredArticles as article}
					<Card.Root
						class="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div class="relative overflow-hidden">
							<img
								src={article.image}
								alt={article.title}
								class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div class="absolute top-4 left-4">
								<Badge class={article.category.color}>
									{article.category.title}
								</Badge>
							</div>
							<div
								class="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<div class="flex space-x-1">
									<Button size="sm" variant="secondary" class="h-8 w-8 p-0">
										<Heart class="h-4 w-4" />
									</Button>
									<Button size="sm" variant="secondary" class="h-8 w-8 p-0">
										<Bookmark class="h-4 w-4" />
									</Button>
									<Button size="sm" variant="secondary" class="h-8 w-8 p-0">
										<Share2 class="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>

						<Card.Content class="p-6">
							<div class="text-muted-foreground mb-3 flex items-center space-x-4 text-sm">
								<div class="flex items-center space-x-1">
									<Calendar class="h-4 w-4" />
									<TimeStamp date={article.publishedAt} />
								</div>
								<div class="flex items-center space-x-1">
									<Clock class="h-4 w-4" />
									<span>{article.readTime}</span>
								</div>
								<div class="flex items-center space-x-1">
									<Eye class="h-4 w-4" />
									<span>{article.views}</span>
								</div>
							</div>

							<h3
								class="group-hover:text-primary mb-2 text-xl leading-tight font-semibold transition-colors"
							>
								{article.title}
							</h3>

							<p class="text-muted-foreground mb-4 line-clamp-2">
								{article.description}
							</p>

							<div class="mb-4 flex flex-wrap gap-1">
								{#each article.tags as tag}
									<Badge variant="secondary" class="px-2 py-1 text-xs">
										{tag}
									</Badge>
								{/each}
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									<img
										src={article.author.avatar}
										alt={article.author.name}
										class="h-8 w-8 rounded-full border"
									/>
									<span class="text-sm font-medium">{article.author.name}</span>
								</div>
								<Button variant="ghost" size="sm">
									Read More
									<ArrowRight class="ml-1 h-3 w-3" />
								</Button>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>
	</section>

	<!-- Categories Section -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold tracking-tight">Popular Categories</h2>
				<p class="text-muted-foreground">Explore content by topic</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each popularCategories as category}
					<Card.Root
						class="cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
					>
						<Card.Content class="flex items-center justify-between p-4">
							<div>
								<h3 class="font-semibold">{category.name}</h3>
								<p class="text-muted-foreground text-sm">{category.count} articles</p>
							</div>
							<Badge class={category.color}>
								<TrendingUp class="mr-1 h-3 w-3" />
								Popular
							</Badge>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>
	</section>

	<!-- Trending Section -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Trending Articles List -->
				<div class="lg:col-span-2">
					<div class="mb-8 flex items-center space-x-2">
						<Sparkles class="text-primary h-6 w-6" />
						<h2 class="text-3xl font-bold tracking-tight">Trending Now</h2>
					</div>

					<div class="space-y-4">
						{#each trendingArticles as article, index}
							<Card.Root class="group cursor-pointer transition-all duration-200 hover:shadow-lg">
								<Card.Content class="flex items-center space-x-4 p-4">
									<div class="flex-shrink-0">
										<div
											class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold"
										>
											{index + 1}
										</div>
									</div>
									<div class="min-w-0 flex-1">
										<h3
											class="group-hover:text-primary truncate text-lg font-semibold transition-colors"
										>
											{article.title}
										</h3>
										<div class="text-muted-foreground mt-1 flex items-center space-x-4 text-sm">
											<span class="flex items-center space-x-1">
												<Clock class="h-3 w-3" />
												<span>{article.readTime}</span>
											</span>
											<span class="flex items-center space-x-1">
												<Eye class="h-3 w-3" />
												<span>{article.views.toLocaleString()}</span>
											</span>
										</div>
									</div>
									{#if article.isHot}
										<Badge variant="destructive" class="flex-shrink-0">🔥 Hot</Badge>
									{/if}
								</Card.Content>
							</Card.Root>
						{/each}
					</div>
				</div>

				<!-- Quick Stats Sidebar -->
				<div class="space-y-6">
					<Card.Root>
						<Card.Content class="p-6">
							<h3 class="mb-4 text-lg font-semibold">This Week's Stats</h3>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<span class="text-muted-foreground text-sm">New Articles</span>
									<span class="font-semibold">12</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-muted-foreground text-sm">Total Views</span>
									<span class="font-semibold">45.2K</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-muted-foreground text-sm">New Subscribers</span>
									<span class="font-semibold">234</span>
								</div>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Content class="p-6">
							<h3 class="mb-4 text-lg font-semibold">Featured Authors</h3>
							<div class="space-y-3">
								{#each ['John Doe', 'Sarah Wilson', 'Mike Chen'] as author}
									<div class="flex items-center space-x-3">
										<img
											src="https://github.com/shadcn.png"
											alt={author}
											class="h-8 w-8 rounded-full border"
										/>
										<div class="min-w-0 flex-1">
											<p class="truncate text-sm font-medium">{author}</p>
											<p class="text-muted-foreground text-xs">Top contributor</p>
										</div>
									</div>
								{/each}
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold tracking-tight">What Our Readers Say</h2>
				<p class="text-muted-foreground mx-auto max-w-2xl">
					Join thousands of developers and writers who trust our platform for quality content and
					community
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Testimonial 1 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="Sarah Chen"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">Sarah Chen</h4>
									<Badge variant="secondary" class="text-xs">Verified Reader</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">Senior Frontend Developer</p>
								<p class="text-sm leading-relaxed">
									"The tutorials here are incredibly detailed and practical. I've learned more about
									modern web development in a few months than I did in years elsewhere."
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(5) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<!-- Testimonial 2 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="Marcus Rodriguez"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">Marcus Rodriguez</h4>
									<Badge variant="secondary" class="text-xs">Top Contributor</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">Full Stack Engineer</p>
								<p class="text-sm leading-relaxed">
									"Amazing community and content quality. The comment discussions are always
									insightful and the articles cover cutting-edge technologies."
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(5) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<!-- Testimonial 3 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="Emily Zhang"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">Emily Zhang</h4>
									<Badge variant="secondary" class="text-xs">Featured Author</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">Technical Writer</p>
								<p class="text-sm leading-relaxed">
									"As both a reader and writer, I love how this platform makes it easy to share
									knowledge and discover new perspectives on technology."
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(5) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<!-- Testimonial 4 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="David Kim"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">David Kim</h4>
									<Badge variant="secondary" class="text-xs">Pro Reader</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">DevOps Engineer</p>
								<p class="text-sm leading-relaxed">
									"The depth of technical content is impressive. Every article I read here adds real
									value to my daily work and career growth."
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(5) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<!-- Testimonial 5 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="Lisa Thompson"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">Lisa Thompson</h4>
									<Badge variant="secondary" class="text-xs">Community Leader</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">Product Manager</p>
								<p class="text-sm leading-relaxed">
									"Perfect balance of technical depth and readability. The articles help me stay
									current with technology trends in my role."
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(4) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
									<Star class="h-4 w-4 text-gray-300" />
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<!-- Testimonial 6 -->
				<Card.Root>
					<Card.Content class="p-6">
						<div class="flex items-start space-x-4">
							<img
								src="https://github.com/shadcn.png"
								alt="Alex Johnson"
								class="h-12 w-12 rounded-full border"
							/>
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex items-center space-x-2">
									<h4 class="font-semibold">Alex Johnson</h4>
									<Badge variant="secondary" class="text-xs">Early Adopter</Badge>
								</div>
								<p class="text-muted-foreground mb-2 text-sm">Junior Developer</p>
								<p class="text-sm leading-relaxed">
									"Started following this blog as a bootcamp student. The beginner-friendly
									explanations helped me land my first developer job!"
								</p>
								<div class="mt-3 flex items-center space-x-1">
									{#each Array(5) as _, i}
										<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
									{/each}
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<!-- Trust Indicators -->
			<div class="mt-12 text-center">
				<div class="text-muted-foreground flex items-center justify-center space-x-8 text-sm">
					<div class="flex items-center space-x-2">
						<div class="h-2 w-2 rounded-full bg-green-400"></div>
						<span>12,000+ Happy Readers</span>
					</div>
					<div class="flex items-center space-x-2">
						<div class="h-2 w-2 rounded-full bg-blue-400"></div>
						<span>4.8 Average Rating</span>
					</div>
					<div class="flex items-center space-x-2">
						<div class="h-2 w-2 rounded-full bg-purple-400"></div>
						<span>98% Would Recommend</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<Card.Root
				class="from-primary/5 to-secondary/5 mx-auto max-w-2xl overflow-hidden border-0 bg-gradient-to-r"
			>
				<Card.Content class="relative p-8 text-center">
					<div class="bg-grid-white/[0.02] absolute inset-0 bg-[size:20px_20px]"></div>
					<div class="relative">
						<div
							class="bg-primary/10 text-primary mb-4 inline-flex items-center rounded-full px-4 py-2 text-sm"
						>
							<Sparkles class="mr-2 h-4 w-4" />
							Join our community
						</div>
						<h2 class="mb-4 text-3xl font-bold">Stay Updated</h2>
						<p class="text-muted-foreground mb-6">
							Get the latest articles and insights delivered directly to your inbox. No spam, ever.
						</p>
						<div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
							<Input
								placeholder="Enter your email"
								class="bg-background/70 flex-1 backdrop-blur-sm"
							/>
							<Button>
								Subscribe Now
								<ArrowRight class="ml-2 h-4 w-4" />
							</Button>
						</div>
						<div
							class="text-muted-foreground mt-4 flex items-center justify-center space-x-4 text-xs"
						>
							<span>✓ Weekly digest</span>
							<span>✓ Breaking news</span>
							<span>✓ Exclusive content</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</section>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
