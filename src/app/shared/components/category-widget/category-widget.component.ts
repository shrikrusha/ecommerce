import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-widget',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-widget.component.html',
  styleUrl: './category-widget.component.scss'
})
export class CategoryWidgetComponent implements OnInit{
  ngOnInit(): void {
    
  }
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string[]>();

  selectedCategories: string[] = [];

  onCategoryChange(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.categorySelected.emit(this.selectedCategories);
  }

}
