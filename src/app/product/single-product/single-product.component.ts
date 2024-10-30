import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BreadcumbsComponent } from '../../shared/components/breadcumbs/breadcumbs.component';
import { CustomerService } from '../../customer/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { IconModule } from '../../shared/icon.module';
import { FormsModule } from '@angular/forms';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { RatingComponent, StarRatingColor } from '../../shared/components/rating/rating.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../shared/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../customer/services/cart.service';


@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, BreadcumbsComponent,IconModule,FormsModule,StarRatingModule,RatingComponent,MatInputModule,MatFormFieldModule, NgxPaginationModule],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [StarRatingConfigService],
  encapsulation:ViewEncapsulation.None
})
export class SingleProductComponent implements OnInit {
  individual_product: any;
  reviewerName: string = '';
  reviewDescription: string = '';
  reviewRating: number = 1;

  // Pagination variables
  page: number = 1; // Current page
  itemsPerPage: number = 5; // Items per page
  totalItems: number = 0; // Total items

  rating:number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  product_id:any;
  userId:any;
  ratingProgressBars = [
    { label: 'Excellent', percentage: 0, class: 'bg-primary' },
    { label: 'Very Good', percentage: 0, class: 'bg-success' },
    { label: 'Good', percentage: 0, class: 'bg-info' },
    { label: 'Average', percentage: 0, class: 'bg-warning' },
    { label: 'Poor', percentage: 0, class: 'bg-danger' },
  ];

  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Product Details', path: 'shop/products' }
  ];

  mainProductImage!: string;
  

  

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private storageService: StorageService,
    private route:ActivatedRoute,
    private productService:ProductService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.userId = this.storageService.getSessionStorageItem("user_session_id");
    this.route.paramMap.subscribe(params => {
      this.product_id = params.get('id');  // Get the 'id' from the URL
    });

    if(this.product_id){
      this.productDetail(this.product_id);
    }

  }
 onRatingChanged(rating: any) {
    this.reviewRating = rating;
    console.log(this.reviewRating)
  }
  changeMainImage(imageUrl: string) {
    this.mainProductImage = imageUrl;
  }
  setRating(rating: number) {
    this.reviewRating = rating;
  }

  // Handle the review form submission
onSubmitReview() {
  const newReview = {
    reviewerName: 'Anonymous', // Replace with a proper name if needed
    comment: this.reviewDescription,
    rating: this.reviewRating,
    date: new Date().toISOString()
  };

  // Add the new review to product reviews
  this.individual_product.reviews.push(newReview);

  // Calculate the new average rating
  const totalReviews = this.individual_product.reviews.length;
  const totalRatingSum = this.individual_product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
  const averageRating = totalRatingSum / totalReviews;

  // Update the product's overall rating
  this.individual_product.rating = averageRating;

  // Update the product in the backend
  this.productService
    .updateProduct(this.product_id, this.individual_product)
    .subscribe(
      (response) => {
        this.productDetail(this.product_id); // Re-fetch the updated product details
        console.log('Product updated successfully', response);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );

  // Reset form fields
  this.reviewDescription = '';
  this.reviewRating = 0;

  // Optionally: Trigger re-calculation of rating summary and progress bars
  this.calculateProgressBarValues(this.individual_product.reviews);
}

  

  // Admin actions
  editReview(review: any) {
    // Implement the logic for editing the review
  }

  deleteReview(reviewId: any) {
    // Remove review from the reviews array
    this.individual_product.reviews = this.individual_product.reviews.filter(
      (review: any) => review.id !== reviewId
    );
  }
   // Fetch product details
   productDetail(single_product_id: any) {
    this.customerService.individualProduct(single_product_id).subscribe(
      data => {
        this.individual_product = data[0];
        this.mainProductImage = this.individual_product.images[0]; // Set initial main image
        this.totalItems = this.individual_product.reviews.length
        this.calculateProgressBarValues(this.individual_product.reviews); // Bind progress bars
      },
      error => {
        console.log(error);
      }
    );
  }


  calculateProgressBarValues(reviews: any[]) {
    let totalRatings = reviews.length;
    let ratingCounts = { excellent: 0, veryGood: 0, good: 0, average: 0, poor: 0 };

    reviews.forEach(review => {
      if (review.rating >= 4.5) ratingCounts.excellent++;
      else if (review.rating >= 3.5) ratingCounts.veryGood++;
      else if (review.rating >= 2.5) ratingCounts.good++;
      else if (review.rating >= 1.5) ratingCounts.average++;
      else ratingCounts.poor++;
    });

    this.ratingProgressBars[0].percentage = (ratingCounts.excellent / totalRatings) * 100;
    this.ratingProgressBars[1].percentage = (ratingCounts.veryGood / totalRatings) * 100;
    this.ratingProgressBars[2].percentage = (ratingCounts.good / totalRatings) * 100;
    this.ratingProgressBars[3].percentage = (ratingCounts.average / totalRatings) * 100;
    this.ratingProgressBars[4].percentage = (ratingCounts.poor / totalRatings) * 100;
  }

  // Helper function to display full stars in reviews
  calculateFullStars(rating: number) {
    return Array(Math.floor(rating)).fill(0);
  }
  addToCart(product: any) {
    this.cartService.getCartByUserId(this.userId).subscribe(cart => {
      if (cart.length > 0) {
        const userCart = cart[0]; // Assuming the user has one active cart
        const productInCart = userCart.products.find((item: any) => item.id === product.id);

        if (productInCart) {
          // If the product is already in the cart, update the quantity
          productInCart.quantity += 1;
          productInCart.total = productInCart.quantity * product.price; // Update total
        } else {
          // If the product is not in the cart, add it
          userCart.products.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            total: product.price, // Initial total for the product
            discountPercentage: product.discountPercentage,
            thumbnail: product.thumbnail,
          });
        }

        // Update the cart in the API
        this.cartService.updateCart(userCart).subscribe(() => {
          alert('Product added to cart successfully!');
        }, error => {
          console.error("Error updating cart:", error);
        });
      } else {
        alert('No cart found for this user.'); // Handle case where no cart exists
      }
    }, error => {
      console.error("Error fetching cart:", error);
    });
  }

  gotToCheckout(id:any){
    this.router.navigate(['checkout',id])
  }
}

