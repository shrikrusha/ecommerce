import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWidgetComponent } from './category-widget.component';

describe('CategoryWidgetComponent', () => {
  let component: CategoryWidgetComponent;
  let fixture: ComponentFixture<CategoryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
