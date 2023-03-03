import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = {
      id: 1,
      text: 'TESTE',
      day: '2',
      reminder: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.task'))).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent.trim()).toEqual(
      component.task.text
    );
    expect(compiled.querySelector('p').textContent.trim()).toEqual(
      component.task.day
    );
  });

  it('should correctly execute onToggle', () => {
    spyOn(component.onToggle, 'emit');
    const container = fixture.debugElement.query(By.css('.task'));

    container.triggerEventHandler('dblclick', new MouseEvent('dblclick'));

    fixture.detectChanges();

    expect(component.onToggle.emit).toHaveBeenCalledWith(component.task);
  });

  it('should correctly execute onDeleteTask', () => {
    spyOn(component.onDeleteTask, 'emit');
    const container = fixture.debugElement.query(By.css('.task'));

    component.onDelete(component.task);

    expect(component.onDeleteTask.emit).toHaveBeenCalledWith(component.task);
  });
});
