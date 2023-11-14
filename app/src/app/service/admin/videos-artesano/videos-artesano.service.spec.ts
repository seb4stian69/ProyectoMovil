import { TestBed } from '@angular/core/testing';

import { VideosArtesanoService } from './videos-artesano.service';

describe('VideosArtesanoService', () => {
  let service: VideosArtesanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosArtesanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
