import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiplyService {

  constructor() { }

  // custom operator: multiplyBy
  multiplyBy<T extends number>(factor:number) {
    return (observable: Observable<T>) => 
      new Observable<T>((observer) => {

        // do this each time the observable is subscribed to
        let hasCompleted = false;

        const subscription = observable.subscribe({
          next: value => {
            // accepts only numbers
            if(typeof value === 'number') {
              observer.next(value * factor as T);
              observer.error('Accepts numeric variables only')
            }
          },
          error: err => observer.error(err),
          complete: () => {
            hasCompleted = true;
            observer.complete();
          }
        });

        // cleanup
        return () => {
          subscription.unsubscribe();
        }
      })

  }
}
