import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../Task';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly execute getTasks', () => {
    let actual: Task[];
    service.getTasks().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        actual = response;
      },
    });

    const mockHttp = httpCtrl.expectOne(TaskService.apiUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');
    mockHttp.flush([]);
    expect(actual).toEqual([]);
  });

  it('should correctly execute addTask', () => {
    const taskMock: Task = {
      text: 'TESTE',
      day: '5',
      reminder: true,
    };

    service.addTask(taskMock).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });

    const mockHttp = httpCtrl.expectOne(TaskService.apiUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('POST');
  });

  it('should correctly execute updateTask', () => {
    const taskMock: Task = {
      text: 'TESTE',
      day: '5',
      reminder: true,
    };

    service.updateTask(taskMock).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });

    const mockHttp = httpCtrl.expectOne(`${TaskService.apiUrl}/${taskMock.id}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('PUT');
  });

  it('should correctly execute updateTask', () => {
    const taskMock: Task = {
      text: 'TESTE',
      day: '5',
      reminder: true,
    };

    service.deleteTask(taskMock).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      },
    });

    const mockHttp = httpCtrl.expectOne(`${TaskService.apiUrl}/${taskMock.id}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('DELETE');
  });
});
