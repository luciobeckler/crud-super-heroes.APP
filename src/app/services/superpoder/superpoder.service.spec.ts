import { TestBed } from '@angular/core/testing';

import { SuperpoderService } from './superpoder.service';

describe('SuperpoderService', () => {
  let service: SuperpoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperpoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
