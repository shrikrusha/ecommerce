import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandWidgetComponent } from './brand-widget.component';

describe('BrandWidgetComponent', () => {
  let component: BrandWidgetComponent;
  let fixture: ComponentFixture<BrandWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
