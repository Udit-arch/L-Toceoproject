import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    addToCart(product: Product) {
        const currentItems = this.itemsSubject.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.itemsSubject.next([...currentItems]);
        } else {
            this.itemsSubject.next([...currentItems, { ...product, quantity: 1 }]);
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.itemsSubject.value;
        this.itemsSubject.next(currentItems.filter(item => item.id !== productId));
    }

    clearCart() {
        this.itemsSubject.next([]);
    }

    getTotalPrice(): number {
        return this.itemsSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}
