import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { MultiplyService } from './multiply.service';

describe('MultiplyService', () => {
  let service: MultiplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply values correctly and push to sourceItems', (done) => {
    const factor = 3;
    const testValues = [1, 2, 3];
    const expectedValues = testValues.map(v => v * factor);

    // Create an observable from the test values
    const source$ = of(...testValues);

    // Use the multiplyBy operator
    source$.pipe(service.multiplyBy(factor)).subscribe({
      next: value => {
        expect(value).toBe(expectedValues.shift());
      },
      complete: () => {
        expect(service.sourceItems).toEqual(testValues);
        done();
      },
    });
  });

  it('should handle non-number values by emitting an error', (done) => {
    const factor = 2;
    const source$ = of('string' as any);

    source$.pipe(service.multiplyBy(factor)).subscribe({
      error: err => {
        expect(err).toBe('Accepts numeric variables only');
        done();
      },
    });
  });

  it('should handle observable completion and cleanup', (done) => {
    const factor = 4;
    const source$ = new Observable<number>(observer => {
      observer.next(5);
      observer.complete();
    });

    const multiplyByOperator = service.multiplyBy(factor);
    const subscription = source$.pipe(multiplyByOperator).subscribe({
      next: value => {
        expect(value).toBe(5 * factor);
      },
      complete: () => {
        expect(service.sourceItems).toEqual([5]);
        done();
      },
    });

    // Unsubscribe to test cleanup
    subscription.unsubscribe();
  });
});
