import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        title: 'Nos produits',
        loadComponent: () => import('./features/products/products-component').then(c => c.ProductsComponent)
    }
];
