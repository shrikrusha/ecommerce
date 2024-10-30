import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../shared/services/storage.service';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartData: any;  // Holds the cart data
  totalDiscount: number = 0;  // To store total discount
  grandTotal: number = 0;  // To store grand total
  totalProduct: any;  // To store total number of products
  order_dto: any;  // DTO for order

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getSessionStorageItem('user_session_id');  // Get userId from sessionStorage

    if (userId) {
      this.loadCartData(parseInt(userId));  // Load cart data if userId exists
    }
  }

  loadCartData(userId: number): void {
    this.cartService.getCartByUserId(userId).subscribe((response) => {
      this.cartData = response[0];  // Assuming response is an array, take the first item
      this.totalProduct = this.cartData.products.length;
      
      // Ensure all products have their totals calculated
      this.cartData.products.forEach((product: any) => {
        this.updateProductTotals(product);
      });
  
      this.calculateTotals();
    });
  }

  // Increment the quantity
  incrementQuantity(product: any): void {
    product.quantity += 1;
    this.updateProductTotals(product);
    this.calculateTotals();
    this.updateCart();  // Save the updated cart to the backend
  }

  // Decrement the quantity
  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateProductTotals(product);
      this.calculateTotals();
      this.updateCart();  // Save the updated cart to the backend
    }
  }

  // Update product total and discounted total based on the new quantity
  updateProductTotals(product: any): void {
    product.total = product.price * product.quantity;  // Update total price
    product.discountedTotal = product.discountPercentage
      ? product.total - (product.total * (product.discountPercentage / 100))
      : product.total;  // If no discount, just set to total
  }

  calculateTotals(): void {
    this.totalDiscount = this.cartData.products.reduce((sum: number, product: any) => {
      return sum + (product.total - product.discountedTotal);
    }, 0);

    this.grandTotal = this.cartData.products.reduce((sum: number, product: any) => {
      return sum + product.discountedTotal;
    }, 0);
  }

  // Remove product from cart
  removeProduct(productId: number): void {
    const index = this.cartData.products.findIndex((p: any) => p.id === productId);
    
    if (index !== -1) {
      this.cartData.products.splice(index, 1);  // Remove product from local array
      this.totalProduct = this.cartData.products.length;  // Update total products count
      this.calculateTotals();  // Recalculate totals
      this.updateCart();  // Save the updated cart to the backend
    }
  }

  // Update the cart in the backend
  updateCart(): void {
    this.cartService.updateCart(this.cartData).subscribe(() => {
      console.log('Cart updated successfully.');
    }, (error) => {
      console.error('Error updating cart', error);
    });
  }

  // Place the order based on the current cart data
placeOrder(): void {
  const userId = this.storageService.getSessionStorageItem('user_session_id');
  
  if (userId && this.cartData) {
    // Prepare the order DTO
    this.order_dto = {
      userId: userId,
      sellerId: this.cartData.sellerId,  // Assuming sellerId exists in cartData
      products: this.cartData.products.map((product: any) => ({
        id: product.id,
        name: product.title,
        quantity: product.quantity,
        price: product.price,
        discountedPrice: product.discountedTotal
      })),
      deliveryAddress: {
        addLine1: 'Your Address Line 1',  // Update with actual address data
        addLine2: 'Your Address Line 2',
        city: 'City',
        state: 'State',
        zipCode: '123456'
      },
      contact: '1234567890',  // Add actual contact info
      grandTotal: this.grandTotal
    };

    // Insert the new order
    this.customerService.insertNewOrder(this.order_dto).subscribe(
      () => {
        alert('Your order has been placed successfully');

        // Clear the cart after order placement
        this.clearCart();

        // Navigate to shop or any other page after order placement
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.log('Error placing order', error);
      }
    );
  } else {
    alert('No cart data found or user not logged in.');
  }
}

// Clear the cart after successful order placement
clearCart(): void {
  this.cartData.products = [];  // Clear the products array in cartData
  this.totalProduct = 0;  // Reset the total product count
  this.grandTotal = 0;  // Reset the grand total
  this.totalDiscount = 0;  // Reset the total discount
  
  // Update the backend cart to reflect the empty cart
  this.updateCart();
}

}
