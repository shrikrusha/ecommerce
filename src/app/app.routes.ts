import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { authGuard } from './shared/services/auth.guard';
import { AllProductComponent } from './product/all-product/all-product.component';
import { SingleProductComponent } from './product/single-product/single-product.component';
import { AdminDashboardContentComponent } from './admin/admin-dashboard/admin-dashboard-content/admin-dashboard-content.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { ManageReviewComponent } from './admin/manage-review/manage-review.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { AddEditUserComponent } from './admin/user-crud/add-edit-user/add-edit-user.component';
import { SellerDashboardContentComponent } from './customer/seller/seller-dashboard/seller-dashboard-content/seller-dashboard-content.component';
import { CartComponent } from './customer/buyer/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path:"my-profile", component:UserProfileComponent },
    { path:"contact-us", component:ContactUsComponent },
    { path:"shop", component:AllProductComponent },
    { path:"shop/view-product/:id", component:SingleProductComponent },
    { path:"about-us", component:AboutUsComponent },

    //admin
    { path:"", children:[
        { path:"admin-login",component:AdminLoginComponent },
    ] },

    { path:"admin", component:AdminDashboardComponent, children:[
        { path:"dashboard", component:AdminDashboardContentComponent, canActivate: [authGuard] },
        { path:"users", component:UserCrudComponent, canActivate: [authGuard] },
        { path:"add-user", component:AddEditUserComponent, canActivate:[authGuard]},
        { path:"edit-user/:id", component:AddEditUserComponent, canActivate:[authGuard]},
        { path:"product", component:ProductComponent, canActivate: [authGuard] },
        { path: 'add-product', component: AddEditProductComponent, canActivate: [authGuard]},
        { path: 'edit-product/:id', component: AddEditProductComponent, canActivate: [authGuard]},
        { path: 'orders', component: ManageOrderComponent, canActivate: [authGuard]},
        { path: 'manage-reviews', component: ManageReviewComponent, canActivate: [authGuard]},
        { path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},
    ] },

    { path:"", children:[
        { path:"sign-in", component:SigninSignupComponent },
        { path:"sign-up", component:SigninSignupComponent }
    ] },

    //seller
    {
        path:"seller", component:SellerDashboardComponent, children:[
            { path:"dashboard", component:SellerDashboardContentComponent, canActivate: [authGuard] },
            { path:"product", component:ProductComponent, canActivate: [authGuard] },
            { path: 'add-product', component: AddEditProductComponent, canActivate: [authGuard]},
            { path: 'edit-product/:id', component: AddEditProductComponent, canActivate: [authGuard]},
            { path: 'orders', component: ManageOrderComponent, canActivate: [authGuard]},
            { path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},

        ]
    },

    //Buyer
    {
        path:"", children:[
            { path:"buyer-dashboard", component:BuyerDashboardComponent, canActivate: [authGuard] },
            { path:"checkout/:id", component:CheckoutComponent },
            { path:"cart", component:CartComponent }
        ]
    },

    { path:"**", component:PageNotFoundComponent }


];
