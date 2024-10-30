import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcumbsComponent } from '../../shared/components/breadcumbs/breadcumbs.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    BreadcumbsComponent,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;
  product_id: any;
  pagetitle!:string;
  thumbnailname!:string;
  breadcrumbItems!: any[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if the route has 'id' for edit
    this.route.paramMap.subscribe((param) => {
      this.product_id = param.get('id');

      // Update breadcrumb items based on whether we're editing or adding a product
    if (this.product_id) {
      this.pagetitle = 'Update a Product'
      this.breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Product', path: '/admin/product' },
        { label: 'Edit Product', path: `admin/edit-product/${this.product_id}` },
      ];
      this.loadProductDetails(this.product_id); // Load product details in edit mode
    } else {
      this.pagetitle = 'Add a new Product'
      this.breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Product', path: '/admin/product' },
        { label: 'Add Product', path: 'admin/add-product' },
      ];
    }
    });

    

    // Initialize form
    this.productForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null,[Validators.required],],
      category: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      discountPercentage: [null, [Validators.min(0)]],
      rating: [null, [Validators.min(0), Validators.max(5)]],
      stock: [null, [Validators.required, Validators.min(1)]],
      tags: this.fb.array([]),
      sku: [null],
      weight: [],
      dimensions: this.fb.group({
        width: [null],
        height: [null],
        depth: [null],
      }),
      warrantyInformation: [null],
      shippingInformation: [null],
      availabilityStatus: [null],
      returnPolicy: [null],
      minimumOrderQuantity: [],
      meta: this.fb.group({
        createdAt: [null],
        updatedAt: [null],
        barcode: [null],
        qrCode: [null],
      }),
      reviews: this.fb.array([]),
      images: this.fb.array([]),
      thumbnail: [
        null,
      ],
    });

    // If product_id exists, populate the form with the product details (edit mode)
    if (this.product_id) {
      this.loadProductDetails(this.product_id);
    }
  }
  calculateTagWidth(value: string): string {
    const minWidth = 50; // Minimum width in pixels
    const charWidth = 10; // Approximate character width in pixels
    const padding = 20; // Padding around the input
    const width = Math.max(minWidth, value.length * charWidth + padding);
    return `${width}px`;
  }
  
  // initReviews() {
  //   return [
  //     this.fb.group({
  //       rating: [5],
  //       comment: [''],
  //       date: [''],
  //       reviewerName: [''],
  //       reviewerEmail: [''],
  //     }),
  //     this.fb.group({
  //       rating: [5],
  //       comment: [''],
  //       date: [''],
  //       reviewerName: [''],
  //       reviewerEmail: [''],
  //     }),
  //     this.fb.group({
  //       rating: [5],
  //       comment: [''],
  //       date: [''],
  //       reviewerName: [''],
  //       reviewerEmail: [''],
  //     }),
  //   ];
  // }

  get tags() {
    return this.productForm.get('tags') as FormArray;
  }

  get reviews() {
    return this.productForm.get('reviews') as FormArray;
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
  
  removeTag(index: number) {
    if (index >= 0) {
      this.tags.removeAt(index);  // Remove tag at the given index
    }
  }
  

  addTag(tag: string) {
    if (tag.trim() !== '') {
      this.tags.push(this.fb.control(tag));
    }
  }

  // get tags() {
  //   return this.productForm.get('tags') as FormArray;
  // }
  // addTag(tag: string) {
  //   if (tag.trim() !== '') {  // Only add non-empty tags
  //     this.tags.push(this.fb.control(tag));
  //   }
  // }
  addReview(review: any) {
    this.reviews.push(this.fb.group(review));
  }

  addImage(base64: string) {
    this.images.push(this.fb.control(base64));
  }  

  // Method to load product details
  loadProductDetails(product_id: any) {
    this.productService.singleProduct(product_id).subscribe(
      (data) => {
        let product = data[0];
        if (product) {
          // Patch simple fields
          this.productForm.patchValue({
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            sku: product.sku,
            weight: product.weight,
            dimensions: product.dimensions,
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            availabilityStatus: product.availabilityStatus,
            returnPolicy: product.returnPolicy,
            minimumOrderQuantity: product.minimumOrderQuantity,
            meta: product.meta,
            thumbnail: product.thumbnail
          });
  
          // Update tags (FormArray)
          if (product.tags) {
            this.updateTags(product.tags);
          }
  
          // Update reviews (FormArray)
          if (product.reviews) {
            this.updateReviews(product.reviews);
          }
  
          // Update images (FormArray)
          if (product.images) {
            this.updateImages(product.images);
          }
        }
      },
      (error) => {
        console.error('Error loading product data', error);
      }
    );
  }
  
  
  // Method to update tags FormArray
updateTags(tags: string[]) {
  const tagsArray = this.productForm.get('tags') as FormArray;
  tagsArray.clear();  // Clear existing entries if any
  
  // Filter out any empty tags and add only non-empty ones
  tags
    .filter(tag => tag.trim() !== '')  // Filter out empty or whitespace-only tags
    .forEach(tag => {
      tagsArray.push(this.fb.control(tag));
    });
}


  // Method to update reviews FormArray
  updateReviews(reviews: any[]) {
    const reviewsArray = this.productForm.get('reviews') as FormArray;
    reviewsArray.clear();  // Clear existing entries if any
    reviews.forEach(review => {
      reviewsArray.push(this.fb.group({
        rating: [review.rating],
        comment: [review.comment],
        date: [review.date],
        reviewerName: [review.reviewerName],
        reviewerEmail: [review.reviewerEmail]
      }));
    });
  }

  handleImageUpload(event: any, type: string) {
    const files = event.target.files;
    if (files) {
      if (type === 'thumbnail') {
        // Handle the thumbnail separately
        const file = files[0];  // Only take the first file for thumbnail
        const reader = new FileReader();
        this.thumbnailname = file.name
        // this.productForm.get('thumbnail')?.setValue(thumbnailname);
        reader.onload = () => {
          const base64String = reader.result as string;
          this.productForm.get('thumbnail')?.setValue(base64String);  // Set the base64 image string in the thumbnail form control
        };
        reader.readAsDataURL(file);  // Convert image to base64
      } else {
        // Handle multiple images upload
        const imagesArray = this.productForm.get('images') as FormArray;
        for (let file of files) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result as string;
            imagesArray.push(this.fb.control(base64String));  // Push base64 image strings into images FormArray
          };
          reader.readAsDataURL(file);  // Convert image to base64
        }
      }
    }
  }
  



// Method to update images FormArray with base64 strings
updateImages(images: string[]) {
  const imagesArray = this.productForm.get('images') as FormArray;
  imagesArray.clear();  // Clear existing entries if any
  images.forEach(image => {
    imagesArray.push(this.fb.control(image)); // Push base64 image strings
  });
}


  onSubmit() {
    if (this.productForm.valid) {
      if (this.product_id) {
        this.editProduct();
      } else {
        this.addProduct();
      }
    }
  }

  addProduct() {
    this.productService.addNewProduct(this.productForm.value).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.router.navigate(['/admin/product']); // Navigate to products list
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }

  editProduct() {
    this.productService
      .updateProduct(this.product_id, this.productForm.value)
      .subscribe(
        (response) => {
          console.log('Product updated successfully', response);
          this.router.navigate(['/admin/product']); // Navigate to products list
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
  }
}
