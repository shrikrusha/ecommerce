import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct: undefined | product[];
  allProducts:undefined | product[];
  constructor (private productservice:ProductService){}
 
  ngOnInit(): void {
    this.productservice.popularProduct().subscribe((product)=>{
      this.popularProduct = product;
    })

    this.productservice.productList().subscribe((allproducts)=>{
      this.allProducts=allproducts;
    })
  }

}
