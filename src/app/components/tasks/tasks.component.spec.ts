import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj<TaskService>([
      'getTasks',
      'updateTask',
      'addTask',
      'deleteTask',
    ]);
    taskServiceSpy.getTasks.and.returnValue(
      of([
        {
          id: 1,
          text: 'Doctors Appointment',
          day: 'May 5th at 2:30pm',
          reminder: true,
        },
      ])
    );

    taskServiceSpy.updateTask.and.returnValue(
      of({
        id: 1,
        text: 'Doctors Appointment',
        day: 'May 5th at 2:30pm',
        reminder: false,
      })
    );

    taskServiceSpy.addTask.and.returnValue(
      of({
        id: 2,
        text: 'Something',
        day: 'May 7th at 2:30pm',
        reminder: true,
      })
    );

    taskServiceSpy.deleteTask.and.returnValue(of());

    const uiServiceSpy = jasmine.createSpyObj<UiService>(['onToggle']);
    uiServiceSpy.onToggle.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        {
          provide: TaskService,
          useValue: taskServiceSpy,
        },
        {
          provide: UiService,
          useValue: uiServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should correctly execute toggleReminder', () => {
    component.toggleReminder({
      id: 1,
      text: 'Doctors Appointment',
      day: 'May 5th at 2:30pm',
      reminder: true,
    });

    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith({
      id: 1,
      text: 'Doctors Appointment',
      day: 'May 5th at 2:30pm',
      reminder: false,
    });
  });

  it('should correctly execute addTask', () => {
    component.addTask({
      text: 'Something',
      day: 'May 7th at 2:30pm',
      reminder: true,
    });

    expect(taskServiceSpy.addTask).toHaveBeenCalledWith({
      text: 'Something',
      day: 'May 7th at 2:30pm',
      reminder: true,
    });
  });

  it('should correctly execute deleteTask', fakeAsync(() => {
    fixture.detectChanges();
    component.deleteTask({
      id: 1,
      text: 'Doctors Appointment',
      day: 'May 5th at 2:30pm',
      reminder: true,
    });

    flush();

    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith({
      id: 1,
      text: 'Doctors Appointment',
      day: 'May 5th at 2:30pm',
      reminder: true,
    });
  }));
});
