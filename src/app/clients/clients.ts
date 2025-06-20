import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler, HttpXhrBackend, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Cargando clientes...</div>
    <div *ngIf="error" style="color: red">{{ error }}</div>
    
    <div *ngIf="data">
      <h3>Clientes reales:</h3>
      <pre>{{ data | json }}</pre>
    </div>
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