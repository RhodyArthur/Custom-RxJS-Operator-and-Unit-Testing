import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, map, of, pipe } from 'rxjs';
import { MultiplyService } from './services/multiply.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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

  constructor(private multiplyService: MultiplyService) {}

  source$ = of(1,2,3,4,5);
  result!: number
  ngOnInit() {

    this.source$.pipe(
      this.multiplyService.multiplyBy(20))
    .subscribe(result => {
      console.log(result)
    result})
  }
}
