import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Task';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  static readonly apiUrl = 'http://localhost:3010/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(TaskService.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${TaskService.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${TaskService.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(TaskService.apiUrl, task, httpOptions);
  }
}
