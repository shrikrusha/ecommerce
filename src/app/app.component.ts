import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DoCheck, HostListener, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { AdminHeaderComponent } from './shared/layouts/admin-header/admin-header.component';
import { StorageService } from './shared/services/storage.service';
import { SellerHeaderComponent } from './shared/layouts/seller-header/seller-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,FooterComponent,AdminHeaderComponent,SellerHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit,DoCheck{
  role: string | null = '';
  screenHeight: number = 0;
  screenWidth: number = 0;
  footerMaxHeight!:number;
  title = 'angularecom';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private storageService: StorageService) {
    
  }
  ngOnInit(): void {
   
  }
  ngDoCheck(): void {
    this.role = this.storageService.getSessionStorageItem("role");
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      // Only run this code in the browser
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      // console.log(this.screenHeight,this.screenWidth)
      if(this.role=='admin' || this.role=='seller'){
        this.footerMaxHeight = this.screenHeight - 53;
      }else{
        this.footerMaxHeight = this.screenHeight - 200;
      }
      
    }
  }
}
