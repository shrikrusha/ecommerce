import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';  // API URL

  constructor(private http: HttpClient) {}

  // Get cart by user ID
  getCartByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?userId=${userId}`);
  }

  // Update cart data using cart ID
  updateCart(cartData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartData.id}`, cartData);  // Correct URL for PUT request
  }
}
