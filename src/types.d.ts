interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	expireIn: number;
}

interface User {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
	enabled: boolean;
	roles: string[];
	createdAt: string;
	updatedAt: string;
}

type Category = {
	id: string;
	title: string;
	description: string;
	image: string | null;
	createdAt: string;
	updatedAt: string;
};

type Pageable = {
	pageNumber: number;
	pageSize: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	offset: number;
	paged: boolean;
	unpaged: boolean;
};

type Page<T> = {
	content: T[];
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	numberOfElements: number;
	first: boolean;
	empty: boolean;
};

type Article = {
	id: string;
	title: string;
	content: string;
	featuredImage: string | null;
	status: string;
	isPublished: boolean;
	publishedAt: string | null;
	createdAt: string;
	updatedAt: string;
	user: {
		id: string;
		username: string;
		avatar: string;
	};
	category: Category | null;
	tags: string[];
};
