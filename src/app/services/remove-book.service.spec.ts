import { TestBed } from '@angular/core/testing';

import { RemoveBookService } from './remove-book.service';

describe('RemoveBookService', () => {
  let service: RemoveBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
