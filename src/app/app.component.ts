import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, map, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-operators';



  // create a custom operator
  // multiplyBy(factor: number) {
  //   return pipe(
  //     filter(val => typeof val === 'number'),
  //     map((v) => v * factor)
  //   )
  // }
}
