import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-size-widget',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './size-widget.component.html',
  styleUrl: './size-widget.component.scss'
})
export class SizeWidgetComponent {
  @Input() sizes: string[] = []; // Array of sizes (tags)
  @Output() sizeSelected = new EventEmitter<string>();

  onSizeChange(size: string) {
    this.sizeSelected.emit(size);  // Emit the selected size
  }
}
