import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  const router = jasmine.createSpyObj(Router, ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly execute backHandler', () => {
    component.backHandler();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
