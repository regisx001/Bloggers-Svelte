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
