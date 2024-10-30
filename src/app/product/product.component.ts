import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object.model';
import { BreadcumbsComponent } from '../shared/components/breadcumbs/breadcumbs.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,BreadcumbsComponent,NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  all_product_data:any;

  role: string = '';
  sellerId: string = '';

   // Pagination variables
   page: number = 1; // Current page
   itemsPerPage: number = 5; // Items per page
   totalItems: number = 0; // Total items

  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Product', path: '' },
    // { label: 'Products', path: '/products' }
  ];
  constructor(private productService:ProductService, private router:Router, private fb:FormBuilder){}
  ngOnInit(): void {
    this.role = sessionStorage.getItem('role') || '';
    this.sellerId = sessionStorage.getItem('user_session_id') || '';
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.allProduct().subscribe(
      (data: any[]) => {
        this.all_product_data = data;
        // Filter products based on role
        if (this.role === 'admin') {
          this.all_product_data = data; // Admin sees all products
        } else if (this.role === 'seller') {
          this.all_product_data = data.filter((product:any) => product.sellerId === this.sellerId);
        }
        this.totalItems = this.all_product_data.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProductPopup() {
    if (this.role === 'admin'){
      this.router.navigateByUrl('admin/add-product')
    }else if (this.role === 'seller'){
      this.router.navigateByUrl('seller/add-product')
    }
    
  }
  editProduct(id:number){
    if (this.role === 'admin'){
      this.router.navigate(['admin/edit-product',id])
    }else if (this.role === 'seller'){
      this.router.navigate(['seller/edit-product',id])
    }
  }

  deleteProduct(id:any){
    let conf = confirm("Do you want to delete this product id" +id)
    if(conf){
      this.productService.deleteProduct(id).subscribe(data=>{
        console.log("Delete successful", data);
        this.getAllProduct();
      },error=>{
        console.log(error)
      })
    }else{
      alert("You pressed cancel !")
    }
  }
  
}
