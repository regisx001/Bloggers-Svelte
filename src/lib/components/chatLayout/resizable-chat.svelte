<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		MessageCircle,
		Send,
		X,
		Bot,
		User,
		Minimize2,
		Maximize2,
		Settings,
		MoreVertical,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte';
	import { onMount } from 'svelte';

	// Props
	let { isVisible = $bindable(false), user = null } = $props();

	// Chat state
	let messageText = $state('');
	let isMinimized = $state(false);
	let chatContainer = $state<HTMLElement>();
	let chatWidth = $state(400); // Default width in pixels

	// Dummy chat data
	let messages = $state([
		{
			id: '1',
			type: 'bot',
			content: "Hello! I'm your AI assistant. How can I help you today?",
			timestamp: new Date(Date.now() - 300000),
			avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=assistant'
		},
		{
			id: '2',
			type: 'user',
			content: 'Can you help me understand how to write better blog posts?',
			timestamp: new Date(Date.now() - 240000),
			avatar: user?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=user'
		},
		{
			id: '3',
			type: 'bot',
			content:
				'Absolutely! Here are some key tips for writing engaging blog posts:\n\n1. **Start with a compelling headline** - Make it clear and attention-grabbing\n2. **Hook your readers early** - Open with an interesting fact or question\n3. **Use clear structure** - Break content into digestible sections\n4. **Include visuals** - Images and formatting make posts more engaging\n5. **End with a call-to-action** - Encourage reader engagement\n\nWould you like me to elaborate on any of these points?',
			timestamp: new Date(Date.now() - 180000),
			avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=assistant'
		},
		{
			id: '4',
			type: 'user',
			content: "That's really helpful! Can you tell me more about writing compelling headlines?",
			timestamp: new Date(Date.now() - 120000),
			avatar: user?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=user'
		},
		{
			id: '5',
			type: 'bot',
			content:
				'Great question! Here are some proven headline techniques:\n\n**Number-based headlines:**\n• "5 Ways to Boost Your Writing"\n• "10 Common Mistakes to Avoid"\n\n**Question headlines:**\n• "What Makes a Blog Post Go Viral?"\n• "Are You Making These Writing Errors?"\n\n**How-to headlines:**\n• "How to Write Headlines That Convert"\n• "How to Engage Your Audience"\n\n**Benefit-focused:**\n• "Double Your Blog Traffic in 30 Days"\n• "The Secret to Better Writing"\n\nThe key is to be specific, promise value, and create curiosity!',
			timestamp: new Date(Date.now() - 60000),
			avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=assistant'
		}
	]);

	function formatTime(date: Date): string {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function sendMessage() {
		if (!messageText.trim()) return;

		const newMessage = {
			id: Date.now().toString(),
			type: 'user' as const,
			content: messageText.trim(),
			timestamp: new Date(),
			avatar: user?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=user'
		};

		messages = [...messages, newMessage];
		messageText = '';

		// Simulate bot response after a delay
		setTimeout(
			() => {
				const botResponses = [
					"That's an interesting question! Let me think about that...",
					"I understand what you're asking. Here's my perspective...",
					'Great point! Based on current best practices...',
					"I can definitely help with that. Here's what I'd recommend...",
					"That's a common challenge many writers face. Here's my advice..."
				];

				const botMessage = {
					id: (Date.now() + 1).toString(),
					type: 'bot' as const,
					content: botResponses[Math.floor(Math.random() * botResponses.length)],
					timestamp: new Date(),
					avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=assistant'
				};

				messages = [...messages, botMessage];
				scrollToBottom();
			},
			1000 + Math.random() * 2000
		);

		scrollToBottom();
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (chatContainer) {
				const scrollArea = chatContainer.querySelector('[data-radix-scroll-area-viewport]');
				if (scrollArea) {
					scrollArea.scrollTop = scrollArea.scrollHeight;
				}
			}
		}, 100);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isVisible) {
			event.preventDefault();
			toggleChat();
		}

		if (event.ctrlKey && event.key === 'm') {
			event.preventDefault();
			toggleChat();
		}
	}

	function toggleChat() {
		isVisible = !isVisible;
	}

	function toggleMinimize() {
		isMinimized = !isMinimized;
	}

	onMount(() => {
		scrollToBottom();

		// Add global keyboard event listener
		const handleKeydownEvent = (event: KeyboardEvent) => handleGlobalKeydown(event);
		document.addEventListener('keydown', handleKeydownEvent);

		// Cleanup on unmount
		return () => {
			document.removeEventListener('keydown', handleKeydownEvent);
		};
	});
</script>

<!-- Chat Toggle Button (when chat is hidden) -->
{#if !isVisible}
	<div class="fixed top-1/2 right-0 z-50 -translate-y-1/2">
		<Button
			onclick={toggleChat}
			size="lg"
			class="bg-primary text-primary-foreground h-16 w-8 rounded-l-lg rounded-r-none shadow-lg transition-all duration-300 hover:w-10 hover:shadow-xl"
		>
			<ChevronLeft class="h-5 w-5" />
		</Button>
	</div>
{:else}
	<!-- Chat Panel - Fixed width sidebar -->
	<div class="bg-background relative flex h-full w-96 flex-col border-l shadow-2xl">
		<!-- Close trigger on left side -->
		<div class="absolute top-1/2 left-0 z-50 -translate-x-full -translate-y-1/2">
			<Button
				onclick={toggleChat}
				size="sm"
				variant="outline"
				class="bg-background text-foreground hover:bg-accent hover:text-accent-foreground h-14 w-7 rounded-l-lg rounded-r-none border border-r-0 shadow-lg transition-all duration-300 hover:w-9"
			>
				<ChevronRight class="h-5 w-5" />
			</Button>
		</div>

		<!-- Chat Header -->
		<div
			class="bg-card/95 flex flex-shrink-0 items-center justify-between border-b p-4 backdrop-blur-sm"
		>
			<div class="flex items-center gap-3">
				<div class="relative">
					<Avatar.Root class="h-8 w-8">
						<Avatar.Image
							src="https://api.dicebear.com/9.x/bottts/svg?seed=assistant"
							alt="AI Assistant"
						/>
						<Avatar.Fallback class="bg-primary text-primary-foreground">AI</Avatar.Fallback>
					</Avatar.Root>
					<div
						class="border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 bg-green-500"
					></div>
				</div>
				<div>
					<h3 class="text-sm font-semibold">AI Writing Assistant</h3>
					<p class="text-muted-foreground text-xs">Online</p>
				</div>
			</div>
			<div class="flex items-center gap-1">
				<Button variant="ghost" size="sm" onclick={toggleMinimize}>
					{#if isMinimized}
						<Maximize2 class="h-4 w-4" />
					{:else}
						<Minimize2 class="h-4 w-4" />
					{/if}
				</Button>
				<Button variant="ghost" size="sm">
					<Settings class="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="sm" onclick={toggleChat}>
					<X class="h-4 w-4" />
				</Button>
			</div>
		</div>

		{#if !isMinimized}
			<!-- Chat Messages -->
			<div class="flex min-h-0 flex-1 flex-col overflow-hidden" bind:this={chatContainer}>
				<ScrollArea class="h-0 flex-1">
					<div class="space-y-4 p-4">
						{#each messages as message (message.id)}
							<div class="flex gap-3 {message.type === 'user' ? 'flex-row-reverse' : ''}">
								<Avatar.Root class="h-8 w-8 flex-shrink-0">
									<Avatar.Image
										src={message.avatar}
										alt={message.type === 'bot' ? 'AI Assistant' : 'User'}
									/>
									<Avatar.Fallback class="bg-muted">
										{#if message.type === 'bot'}
											<Bot class="h-4 w-4" />
										{:else}
											<User class="h-4 w-4" />
										{/if}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex max-w-[80%] flex-col gap-1">
									<div
										class="flex items-center gap-2 {message.type === 'user'
											? 'flex-row-reverse'
											: ''}"
									>
										<span class="text-xs font-medium">
											{message.type === 'bot' ? 'AI Assistant' : user?.username || 'You'}
										</span>
										<span class="text-muted-foreground text-xs">
											{formatTime(message.timestamp)}
										</span>
									</div>
									<div
										class="rounded-lg p-3 {message.type === 'user'
											? 'bg-primary text-primary-foreground ml-auto'
											: 'bg-muted/50 backdrop-blur-sm'}"
									>
										<div class="text-sm whitespace-pre-wrap">{message.content}</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>

			<!-- Message Input -->
			<div class="bg-card/95 flex-shrink-0 border-t p-4 backdrop-blur-sm">
				<div class="flex gap-2">
					<div class="relative flex-1">
						<Input
							bind:value={messageText}
							onkeydown={handleKeydown}
							placeholder="Type your message..."
							class="border-input bg-background/95 pr-12 backdrop-blur-sm"
						/>
						<Button
							onclick={sendMessage}
							size="sm"
							class="absolute top-1 right-1 h-7 w-7 p-0"
							disabled={!messageText.trim()}
						>
							<Send class="h-3 w-3" />
						</Button>
					</div>
				</div>
				<div class="mt-2 flex items-center gap-2">
					<Badge variant="secondary" class="text-xs">
						<Bot class="mr-1 h-3 w-3" />
						AI-powered
					</Badge>
					<span class="text-muted-foreground text-xs">
						Press Enter to send, Shift+Enter for new line
					</span>
				</div>
			</div>
		{:else}
			<!-- Minimized state -->
			<div class="bg-card/95 flex flex-1 flex-col justify-center p-4 text-center backdrop-blur-sm">
				<MessageCircle class="text-muted-foreground mx-auto h-8 w-8" />
				<p class="text-muted-foreground mt-2 text-sm">Chat minimized</p>
				<Badge variant="outline" class="mx-auto mt-2">
					{messages.length} messages
				</Badge>
			</div>
		{/if}
	</div>
{/if}
