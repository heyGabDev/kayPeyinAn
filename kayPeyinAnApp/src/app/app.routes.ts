import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        title: 'Nos produits',
        loadComponent: () => import('./features/products/products-component').then(c => c.ProductsComponent)
    },
    {
        path:'products/:id',
        title: 'Détail produit',
        loadComponent: () => import('./features/product/product-component').then(c => c.ProductComponent)
    },
];
