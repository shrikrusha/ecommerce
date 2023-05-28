import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  addProduct(data:product){
    return this.httpclient.post('http://localhost:3000/products',data);
  }
  productList(){
    return this.httpclient.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number){
    return this.httpclient.delete(('http://localhost:3000/products/'+id));
  }
  getProduct(id:string){
    return this.httpclient.get<product>('http://localhost:3000/products/'+id);
  }
  updateProduct(productdata:product){
    return this.httpclient.put<product>('http://localhost:3000/products/'+productdata.id,productdata);
  }
  popularProduct(){
    return this.httpclient.get<product[]>('http://localhost:3000/products?_limit=4');
  }
  searchProduct(query:string){
    // debugger
    return this.httpclient.get<product[]>('http://localhost:3000/products?q='+query);
  }
  
}
