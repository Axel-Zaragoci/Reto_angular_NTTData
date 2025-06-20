import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsComponent } from './clients/clients';

// app.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientsComponent],
  template: `<app-clients></app-clients><router-outlet></router-outlet>`
})
export class App {}
