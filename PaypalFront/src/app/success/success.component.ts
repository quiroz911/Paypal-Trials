import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  

  constructor(private http:HttpClient, private route:ActivatedRoute){}

  ngOnInit(): void {
    let paymentId = this.route.snapshot.queryParamMap.get('paymentId')!;
    let payerId = this.route.snapshot.queryParamMap.get('PayerID')!;
    console.log(this.route.snapshot.queryParamMap.get('paymentId'));
    
    let params = new HttpParams();
    params = params.set('paymentId', paymentId);
    params = params.set('PayerID', payerId);

    const url = 'http://localhost:8080/pay';
    this.http.post(url, params).subscribe(
      response => {
       console.log("Coronamos")
      },
      error => {
        console.log("falló");
      }
    );
  }

}
