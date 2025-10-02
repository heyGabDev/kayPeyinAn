import { CommonModule } from '@angular/common';
import { Location as NgLocation } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../../core/category-pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../modeles/product.modele';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product-service';

@Component({
  selector: 'app-product-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryPipe,
    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
export class ProductComponent implements OnInit {
  productId: number | null = null;
  product: Product | null = null;

  // Quantité
  minQty = 1;
  maxQty = 20;
  quantity = 1;

  // Services
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private ngLocation = inject(NgLocation);

  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id'); 
  const id = idParam === null ? NaN : Number(idParam); 

  if (Number.isFinite(id)) {
    this.productId = id;
    this.getProductDetails(id); 
    }
  }

  getProductDetails(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (data: Product) => (
        this.product = data,
        this.quantity = 1 ),// reset qty on new product load),
      error: (err) => console.error('Product recovery error: ', err),
    });
  }

  // Navigation
  goBack(): void {
    this.ngLocation.back();
  }

  // Quantité
  increment(): void {
    if (this.quantity < this.maxQty) this.quantity++;
  }

  decrement(): void {
    if (this.quantity > this.minQty) this.quantity--;
  }

  onQtyChange(val: number): void {
    // Garde la quantité dans les bornes
    if (val == null) return;
    this.quantity = Math.max(this.minQty, Math.min(this.maxQty, Number(val)));
  }

  // Panier
  addToCart(productId: number, event: Event): void {
    event.stopPropagation();
    console.log(`Produit ajouté au panier: ${productId} (qty: ${this.quantity})`);
    // TODO: brancher un CartService si nécessaire
  }
}
