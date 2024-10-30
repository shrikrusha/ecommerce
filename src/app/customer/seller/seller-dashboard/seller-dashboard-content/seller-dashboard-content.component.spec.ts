import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardContentComponent } from './seller-dashboard-content.component';

describe('SellerDashboardContentComponent', () => {
  let component: SellerDashboardContentComponent;
  let fixture: ComponentFixture<SellerDashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDashboardContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerDashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
