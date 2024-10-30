import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, User } from '../../../core/Model/object.model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  single_product_id: any;
  product_id: any;
  user_id: any;
  individual_product!: any;
  user_detail!: User;
  user_address: any = {}; // Initialize user_address as an empty object
  user_contact_no: any;
  order_dto!: Order;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route:ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.product_id = params.get('id');  // Get the 'id' from the URL
    });

    this.user_id = Number(this.storageService.getSessionStorageItem('user_session_id'));

    // Load the product details
    if (this.product_id) {
      this.productDetail();
    }

    // Load user address
    this.userAddress(this.user_id);
  }

  productDetail() {
    this.customerService.individualProduct(this.product_id).subscribe(
      data => {
        this.individual_product = data[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  userAddress(user_id: any) {
    this.customerService.userDetail(user_id).subscribe(
      data => {
        if (data && data[0]) {
          this.user_address = data[0].address || {}; // Ensure user_address exists
          this.user_contact_no = data[0].mobNumber;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  placeOrder() {
    this.order_dto = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDescription: this.individual_product.productDescription,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode,
      },
      contact: this.user_contact_no,
      dateTime: new Date().toISOString(),
    };

    console.log('Order detail:', this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe(
      data => {
        alert('Your order has been placed successfully');
        this.router.navigateByUrl('/buyer-dashboard');
      },
      error => {
        console.log(error);
      }
    );
  }
}
