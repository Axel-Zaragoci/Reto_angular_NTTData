import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler, HttpXhrBackend, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Datos</h2>
    <ul>
      @for (client of data; track $index) {
        <li>{{ client.name }}</li>
      } @empty {
        <p>No hay nada</p>
      }
    </ul>
  `,
  providers: [
    // Configuración COMPLETA y AUTÓNOMA de HttpClient
    {
      provide: HttpClient,
      useFactory: () => {
        const handler = new HttpXhrBackend({ build: () => new XMLHttpRequest() });
        return new HttpClient(handler);
      }
    }
  ]
})
export class ClientsComponent {
  loading = true;
  error: string | null = null;
  data: any = null;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    const headers = new HttpHeaders({
      'X-Group-Id': '7',  // Header requerido por tu API
      'Content-Type': 'application/json'
    });

    this.http.get('https://clients-example-api.fly.dev/api/clients', { headers })
      .subscribe({
        next: (response) => {
          this.data = response;
          this.loading = false;
          console.log('Datos reales obtenidos:', response);
        },
        error: (err) => {
          this.error = `Error ${err.status}: ${err.message}`;
          this.loading = false;
          console.error('Error completo:', {
            url: err.url,
            status: err.status,
            headers: err.headers,
            body: err.error
          });
        }
      });
  }
}