import { Injectable } from '@angular/core';
import { ProductCategory } from '../../modeles/product.modele';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategoryLabel(key: string): string {
    switch (key) {
      case '0':
        return 'Boulangerie';
      case '1':
        return 'Pâtisserie';
      case '2':
        return 'Snacking';
      case '3':
        return 'Boisson';
      default:
        return 'Inconnu';
    }
  }

  getCategoryEnum(key: string): number{
    switch (key) {
      case 'Boulangerie':
        return 0;
      case 'Pâtisserie':
        return 1;
      case 'Snacking':
        return 2;
      case 'Boisson':
        return 3;
      default:
        return -1;
    }
  }
}

export const ProductCategoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.Boulangerie]: 'Boulangerie',
  [ProductCategory.Pâtisserie]: 'Pâtisserie',
  [ProductCategory.Snacking]: 'Snacking',
  [ProductCategory.Boisson]: 'Boisson'
};

