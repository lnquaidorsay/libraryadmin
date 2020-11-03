import { TestBed } from '@angular/core/testing';

import { GetBookListService } from './get-book-list.service';

describe('GetBookListService', () => {
  let service: GetBookListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBookListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
