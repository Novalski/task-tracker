import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { UiService } from './ui.service';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly execute methods', () => {
    service.toggleAddTask();
    service.onToggle().subscribe((value) => expect(value).toBeFalsy());
  });
});
