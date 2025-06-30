import { PRIVATE_BACKEND_URL } from '$env/static/private';

export const LOGIN_URL = PRIVATE_BACKEND_URL + '/auth/login';
export const REGISTER_URL = PRIVATE_BACKEND_URL + '/auth/register';
export const VERIFY_URL = PRIVATE_BACKEND_URL + '/auth/verify';
export const USER_INFO_URL = PRIVATE_BACKEND_URL + '/auth/me';
export const REFRESH_TOKEN_URL = PRIVATE_BACKEND_URL + '/auth/refresh-token';
