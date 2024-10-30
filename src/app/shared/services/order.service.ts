import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public product_url="http://localhost:3000/orders"
  constructor(private apiService: ApiService,private http:HttpClient) { }

  allOrders():Observable<any>{
    return this.apiService.get(this.product_url)
  }

}
