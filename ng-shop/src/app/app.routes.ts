import { Routes } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { AdminComponent } from './components/admin/admin';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
