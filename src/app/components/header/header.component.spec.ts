import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let uiServiceSpy: jasmine.SpyObj<UiService>;

  beforeEach(async () => {
    uiServiceSpy = jasmine.createSpyObj<UiService>([
      'toggleAddTask',
      'onToggle',
    ]);

    uiServiceSpy.onToggle.and.callFake(function () {
      return of(true);
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: UiService,
          useValue: uiServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly execute toggleAddTask ', () => {
    uiServiceSpy = TestBed.inject(UiService) as jasmine.SpyObj<UiService>;
    component.toggleAddTask();

    expect(uiServiceSpy.toggleAddTask).toHaveBeenCalled();
  });
});
