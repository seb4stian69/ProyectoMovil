import { TestBed } from '@angular/core/testing';

import { IngresosLogsService } from './ingresos-logs.service';

describe('IngresosLogsService', () => {
  let service: IngresosLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresosLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
