import { Component,AfterViewInit,OnInit, ViewEncapsulation, } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IconModule } from '../../shared/icon.module';
import { FormsModule } from '@angular/forms';
import { PriceRangeSliderComponent } from '../../shared/components/price-range-slider/price-range-slider.component';
import { PriceWidgetComponent } from '../../shared/components/price-widget/price-widget.component';
import { SizeWidgetComponent } from '../../shared/components/size-widget/size-widget.component';
import { BrandWidgetComponent } from '../../shared/components/brand-widget/brand-widget.component';
import { CategoryWidgetComponent } from '../../shared/components/category-widget/category-widget.component';
import { BreadcumbsComponent } from '../../shared/components/breadcumbs/breadcumbs.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomerService } from '../../customer/services/customer.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../customer/services/cart.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule,
            IconModule,
            FormsModule,
            PriceRangeSliderComponent,
            PriceWidgetComponent,
            SizeWidgetComponent,
            BrandWidgetComponent,
            CategoryWidgetComponent,
            BreadcumbsComponent,
            MatSelectModule,
            MatInputModule,
            MatFormFieldModule,
            NgxPaginationModule],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class AllProductComponent implements OnInit, AfterViewInit{

  searchTerm: string = '';

  all_products: any[] = []; // Original list of all products
  filtered_products: any[] = []; // Filtered product list

  selectedCategory: string[] = [];
  selectedBrand: string[] = [];

  categories: any[] = [];
  brands: any[] = [];

  show_checkout:boolean=false;
  imgsrc:any;

   // Pagination variables
   page: number = 1; // Current page
   itemsPerPage: number = 6; // Items per page
   totalItems: number = 0; // Total items

   userId:any;
  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    // { label: 'Products', path: '/products' }
  ];

  DefaultSorting: DefaultSorting[] = [
    {value: 'low-to-high', viewValue: 'Low to High'},
    {value: 'hight-to-low', viewValue: 'HightoLow'},
    {value: 'new-added', viewValue: 'New Added'},
    {value: 'on-sale', viewValue: 'On Sale'},
  ];

  constructor(private router:Router, private customerService:CustomerService, private productService:ProductService, private cartService:CartService,private storageService:StorageService){}
  ngOnInit(): void {
    this.userId = this.storageService.getSessionStorageItem("user_session_id");
    this.seatrchProducts(''); // Fetch all products initially
  this.filtered_products = this.all_products; // Initialize filtered_products with all products
  this.totalItems = this.filtered_products.length; // Initialize totalItems
  }
  ngAfterViewInit(): void {
    
  }
  
  seatrchProducts(filters: any) {
    // Pass filters to the API
    this.productService.searchProduct(filters).subscribe(data => {
      this.all_products = data;
      this.totalItems = data.length;

      this.categories = [...new Set(data.map((product: any) => product.category))];
      this.brands = [...new Set(data.map((product: any) => product.brand))];
  
      this.applyFilters();
    }, error => {
      console.log("Error fetching filtered products:", error);
    });
  }
  
  buyProduct(id:number){
    this.show_checkout=true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout')
  }
  
  // addToCart(){
  //   alert('This is showcase')
  // }

  // Function to handle filtering based on search, category, brand, and size
  applyFilters() {
    // Construct the filter object
    const filters = {
      searchTerm: this.searchTerm,
      selectedCategory: this.selectedCategory,
      selectedBrand: this.selectedBrand,
    };
  
    // Remove empty or undefined filters
    const cleanedFilters = this.removeEmptyFilters(filters);
  
    // Fetch the filtered products from the API
    this.productService.searchProduct(cleanedFilters).subscribe(data => {
      this.all_products = data;
      this.all_products = this.filterExpression(this.all_products, filters);
      this.totalItems = this.all_products.length; // Set total items for pagination
      
    }, error => {
      console.error("Error fetching filtered products:", error);
    });
  }
  
  // Define a separate function for filter expression
  filterExpression(products: any[], filters: any): any[] {
    const { searchTerm, selectedCategory, selectedBrand } = filters;

    return products.filter(product => {
        const matchesSearch = searchTerm
            ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchesCategory = selectedCategory.length
            ? selectedCategory.includes(product.category)
            : true;

        const matchesBrand = selectedBrand.length
            ? selectedBrand.includes(product.brand)
            : true;

        return matchesSearch && matchesCategory && matchesBrand;
    });
}

  // Utility function to remove empty filter values
removeEmptyFilters(filters: any) {
  const cleanedFilters: any = {};

  // Check each filter and add it to cleanedFilters only if it's not empty
  Object.keys(filters).forEach(key => {
    const value = filters[key];

    // Add non-empty values (string, array, or number) to cleanedFilters
    if (
      (Array.isArray(value) && value.length > 0) || // Non-empty arrays
      (typeof value === 'string' && value.trim() !== '') || // Non-empty strings
      (typeof value === 'number' && !isNaN(value)) // Valid numbers
    ) {
      cleanedFilters[key] = value;
    }
  });

  return cleanedFilters;
}

onCategoryChange(event: any) {
  const category = event.target.value;

  if (event.target.checked) {
    // Add category to the selected list if it's checked
    this.selectedCategory.push(category);
  } else {
    // Remove category from the selected list if it's unchecked
    this.selectedCategory = this.selectedCategory.filter(cat => cat !== category);
  }

  // Apply filters after updating the category selection
  this.applyFilters();
}

onBrandChange(event: any) {
  const brand = event.target.value;

  if (event.target.checked) {
    // Add brand to the selected list if it's checked
    this.selectedBrand.push(brand);
  } else {
    // Remove brand from the selected list if it's unchecked
    this.selectedBrand = this.selectedBrand.filter(br => br !== brand);
  }

  // Apply filters after updating the brand selection
  this.applyFilters();
}

onSizeChange(event: any) {
  const selectedTag = event.target.value;

  const filters = {
    searchTerm: this.searchTerm,
    selectedCategory: this.selectedCategory,
    selectedBrand: this.selectedBrand,
  };

  const cleanedFilters = this.removeEmptyFilters(filters);

  this.seatrchProducts(cleanedFilters);
}

  viewProduct(id: number) {
    this.router.navigate(['/shop/view-product', id]); // Assuming you have a route for product details
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
}
  

interface DefaultSorting {
  value: string;
  viewValue: string;
}