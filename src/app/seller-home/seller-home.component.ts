import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit{
  productList:undefined | product[];
  productMessage:undefined|string;
  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is deleted";
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined;
    }, 3000)
  }
  list(){
    this.productService.productList().subscribe((result)=>{
      this.productList=result;
    })
  }
}
