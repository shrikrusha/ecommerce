import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit{
  productData : undefined | product;
  productMessage: undefined | string;
  constructor (private activatedroute:ActivatedRoute, private productservice:ProductService){}
  ngOnInit(): void {
    let productId=this.activatedroute.snapshot.paramMap.get('id');
    console.log("Product Id",productId);
    productId && this.productservice.getProduct(productId).subscribe((data)=>{
      console.log("single data",data)
      this.productData=data;
    })

  }
  submit(data:product){
    console.warn(data)
    if(this.productData){
      data.id=this.productData.id;
    }
    this.productservice.updateProduct(data).subscribe((result)=>{
      this.productMessage="Product has updated"
    });
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000)
  }
  
}
