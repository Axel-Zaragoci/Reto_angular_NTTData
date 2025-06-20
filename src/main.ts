// main.ts
import 'zone.js';            // Para Angular 16+

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient() // ✅ Solo aquí
  ]
});