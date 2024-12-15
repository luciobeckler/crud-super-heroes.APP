import { TestBed } from '@angular/core/testing';

import { HeroiService } from './heroi.service';

describe('HeroiService', () => {
  let service: HeroiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
