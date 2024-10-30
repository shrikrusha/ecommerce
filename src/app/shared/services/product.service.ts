import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product_url="http://localhost:3000/products"
  constructor(private apiService: ApiService,private http:HttpClient) { }

  allProduct():Observable<any>{
    return this.apiService.get(this.product_url)
  }

  addNewProduct(product_dto:any):Observable<any>{
    return this.apiService.post(this.product_url,product_dto);
  }

  singleProduct(product_id:any): Observable<any> {
    return this.apiService.get(`${this.product_url}?id=${product_id}`);
  }

  updateProduct(product_id:any,product_dto:any):Observable<any>{
    return this.apiService.put(`${this.product_url}/${product_id}`, product_dto);
  }

  deleteProduct(product_id:any):Observable<any>{
    return this.apiService.delete(`${this.product_url}/${product_id}`)
  }

  searchProduct(filters?: any): Observable<any[]> {
    let params = new HttpParams(); // Initialize HttpParams object
  
    // Add filters dynamically if they are provided
    if (filters) {
      // Debugging: Check the values of selectedCategory and selectedBrand
      console.log('Selected Category:', filters.selectedCategory);
      console.log('Selected Brand:', filters.selectedBrand);
  
      // Check if selectedCategory is a valid array and join categories
      if (Array.isArray(filters.selectedCategory) && filters.selectedCategory.length > 0) {
        params = params.set('category', filters.selectedCategory.join(','));  // Assign after setting
      }
  
      // Check if selectedBrand is a valid array and join brands
      if (Array.isArray(filters.selectedBrand) && filters.selectedBrand.length > 0) {
        params = params.set('brand', filters.selectedBrand.join(','));  // Assign after setting
      }
  
      // Add search term if it's provided and non-empty
      if (filters.searchTerm && filters.searchTerm.trim() !== '') {
        params = params.set('q', filters.searchTerm.trim());
      }
  
      // Add minPrice and maxPrice if they are provided
      if (filters.minPrice != null) {
        params = params.set('minPrice', filters.minPrice.toString());
      }
  
      if (filters.maxPrice != null) {
        params = params.set('maxPrice', filters.maxPrice.toString());
      }
    }
  
    // Debugging: Log the final params to check if the query parameters are correctly set
    console.log('Params:', params.toString());
  
    // Make the HTTP GET request with the provided parameters
    return this.http.get<any[]>('http://localhost:3000/products', { params });
  }
  
  
  
  
  
  
}
