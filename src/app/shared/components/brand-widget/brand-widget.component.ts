import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand-widget',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './brand-widget.component.html',
  styleUrl: './brand-widget.component.scss'
})
export class BrandWidgetComponent {
  @Input() brands: string[] = [];
  @Output() brandSelected = new EventEmitter<string>();

  selectedBrand: string = '';

  onBrandChange(brand: any) {
    this.selectedBrand = brand;
    this.brandSelected.emit(brand);
  }
}
