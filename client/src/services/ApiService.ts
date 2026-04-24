import { AppConfig } from '../App.config';

export default class ApiService {
	apiUrl: string;

	constructor() {
		this.apiUrl = AppConfig.API_URL;
	}

	async getTasks() {
		return await this.doFetch(`${this.apiUrl}/tasks`, { method: 'GET' });
	}

	async doFetch(url: string, options: object) {
		try {
			const res = await fetch(url, options);
			return await res.json();
		} catch (err) {
			console.error('Error fetching: ', err);
		}
	}
}
