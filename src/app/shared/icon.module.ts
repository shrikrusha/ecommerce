import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule from '@angular/material/icon'
import { MatIconRegistry } from '@angular/material/icon'; // Import MatIconRegistry
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [MatIconModule], // Import MatIconModule here
  exports: [MatIconModule]

})
export class IconModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('person',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/person-fill.svg'));
    this.matIconRegistry.addSvgIcon('message',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/chat-left-text-fill.svg'));
    this.matIconRegistry.addSvgIcon('heart',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heart.svg'));
    this.matIconRegistry.addSvgIcon('heart-fill',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heart-fill.svg'));
    this.matIconRegistry.addSvgIcon('cart',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/cart-fill.svg'));
    this.matIconRegistry.addSvgIcon('chevron-right',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/chevron-right.svg'));
    this.matIconRegistry.addSvgIcon('list',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/list.svg'));
    this.matIconRegistry.addSvgIcon('box',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/box-icon.svg'));
    this.matIconRegistry.addSvgIcon('dashboard',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/category-icon.svg'));
    this.matIconRegistry.addSvgIcon('order',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/orders-icon.svg'));
    this.matIconRegistry.addSvgIcon('user',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/crowd-icon.svg'));
    this.matIconRegistry.addSvgIcon('review',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/five-stars-thumbs-up-icon.svg'));
  }

}
