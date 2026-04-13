import type { HandleFetch } from '@sveltejs/kit';
import { API_PATH } from '$env/static/private';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith('/api/')) {
		// clone the original request, but change the URL
    console.log('Pinging the API...');
		request = new Request(
			request.url.replace('/api/', API_PATH),
			request
		);
	}

	return fetch(request);
};