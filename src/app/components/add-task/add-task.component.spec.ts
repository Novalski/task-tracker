import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from 'src/app/Task';

import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  const taskMock: Task = {
    text: 'TESTE',
    day: '5',
    reminder: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly execute onAddTask', () => {
    const onAddTaskSpy = spyOn(component.onAddTask, 'emit');

    component.text = taskMock.text;
    component.day = taskMock.day;
    component.reminder = taskMock.reminder;

    component.onSubmit();

    expect(onAddTaskSpy).toHaveBeenCalledWith(taskMock);
  });
});
