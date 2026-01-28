import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent {
  model: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: 'https://via.placeholder.com/300'
  };

  categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(form: any) {
    if (form.valid) {
      this.productService.addProduct(this.model as Product).subscribe({
        next: () => {
          this.snackBar.open('Product added successfully!', 'Close', { duration: 3000 });
          form.resetForm();
          this.model = {
            name: '',
            description: '',
            price: 0,
            category: '',
            imageUrl: 'https://via.placeholder.com/300'
          };
        },
        error: (err) => {
          this.snackBar.open('Error adding product', 'Close', { duration: 3000 });
          console.error(err);
        }
      });
    }
  }
}
