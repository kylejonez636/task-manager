import { AppConfig } from '../App.config';
import type Task from '../models/Task';

export default class ApiService {
	apiUrl: string;

	constructor() {
		this.apiUrl = AppConfig.API_URL;
	}

	async getTasks() {
		return await this.doFetch(`${this.apiUrl}/tasks`, { method: 'GET' });
	}

  async createTask(task: Task) {
    return await this.doFetch(`${this.apiUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
  }

  async updateTask(task: Task) {
    return await this.doFetch(`${this.apiUrl}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
  }

  async deleteTask(taskId: string) {
    return await this.doFetch(`${this.apiUrl}/tasks/${taskId}`, { method: 'DELETE '});
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
