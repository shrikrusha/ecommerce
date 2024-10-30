import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { IconModule } from '../../icon.module';
import { CartService } from '../../../customer/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,IconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  role: string | null = '';
  userId:any;
  logged_in: boolean = false;
  totalCartProduct:any;

  constructor(private router: Router, private storageService: StorageService, private cartService:CartService) {}

  ngOnInit(): void {
    this.role = this.storageService.getSessionStorageItem("role");
    this.userId = this.storageService.getSessionStorageItem("user_session_id");
    this.logged_in = !!this.storageService.getSessionStorageItem("user_session_id");
    if(this.role=='buyer'){
      this.loadCartData(this.userId);
    }
  }

  ngDoCheck(): void {
    this.role = this.storageService.getSessionStorageItem("role");
    this.logged_in = !!this.storageService.getSessionStorageItem("user_session_id");
  }

  logout(): void {
    this.storageService.removeSessionStorageItem("user_session_id");
  this.storageService.removeSessionStorageItem("role");
  this.storageService.removeSessionStorageItem("usrname");
  this.storageService.removeSessionStorageItem("profile_photo");
    this.router.navigateByUrl("/sign-in");
  }
  loadCartData(userId: number): void {
    this.cartService.getCartByUserId(userId).subscribe((response) => {
      this.totalCartProduct = response[0].products.length;
    });
  }
}
