import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  price:number=0;
  currency:string = "USD";
  method:string = "paypal";
  intent:string = "sale";
  description:string = " ";

  constructor(private http: HttpClient, private router:Router) { }

  onSubmit() {
      const url = 'http://localhost:8080/order';
      const body = {
        price: this.price,
        currency: this.currency,
        method: this.method,
        intent: this.intent,
        description: this.description
      };

      this.http.post(url, body).subscribe(
        (response:any) => {
          console.log('Respuesta del servidor:', response);
          window.location.href = response.href;
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          // Realiza acciones adicionales en caso de error
        }
      );
    }
}


