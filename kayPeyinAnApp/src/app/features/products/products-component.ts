import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CategoryPipe } from '../../core/category-pipe';
import { Product, ProductCategory } from '../../modeles/product.modele';
import { ProductService } from '../../services/product/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    // Pipes
    CategoryPipe,
  ],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css'
})
export class ProductsComponent implements OnInit {
  // Données
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedItems: Product[] = [];

  // Pagination
  totalItems = 0;
  itemsPerPage = 12;
  currentPage = 0;

  // Filtres
  categories: { label: string; value: number }[] = [];
  selectedCategory: ProductCategory | null = null;

  // Recherche
  productForm: FormGroup;
  searchText = new FormControl<string>('');

  // Services
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor() {
    this.productForm = new FormGroup({
      searchText: this.searchText,
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadCategories();
  }

  // Chargement / mapping
  loadData(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.totalItems = res.length;
      this.updatePagedProducts();
    });
  }

  loadCategories(): void {
    this.categories = Object.values(ProductCategory)
      .filter((v) => typeof v === 'number')
      .map((value: ProductCategory) => ({
        label: ProductCategory[value as number],
        value: value as ProductCategory,
      }));
  }

  // Pagination locale
  updatePagedProducts(): void {
    const start = this.currentPage * this.itemsPerPage;
    const source = this.filteredProducts.length ? this.filteredProducts : this.products;
    this.pagedItems = source.slice(start, start + this.itemsPerPage);
  }

  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize ?? this.itemsPerPage;
    this.currentPage = event.pageIndex ?? this.currentPage;
    this.updatePagedProducts();
  }

  // Filtres
  onCategoryChange(selected: ProductCategory | null): void {
    this.selectedCategory = selected;
    this.applyFilters();
  }

  applyFilters(): void {
    const search = (this.searchText.value ?? '').toLowerCase();
    const selected = this.selectedCategory;

    this.filteredProducts = this.products.filter((product) => {
      const matchCategory = selected !== null ? product.category === selected : true;
      const matchSearch = search ? product.product_name.toLowerCase().includes(search) : true;
      return matchCategory && matchSearch;
    });

    this.currentPage = 0;
    this.updatePagedProducts();
    this.totalItems = (this.filteredProducts.length || this.products.length);
  }

  resetFilters(): void {
    this.searchText.setValue('');
    this.selectedCategory = null;
    this.filteredProducts = [];
    this.currentPage = 0;
    this.totalItems = this.products.length;
    this.updatePagedProducts();
  }

  // UI actions
  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(productId: number, event: Event): void {
    event.stopPropagation();
    console.log(`Produit ajouté au panier: ${productId}`);
  }
}
