import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../modeles/product.modele';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'assets/datas/products_mock.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    // Qd j'aurais mon back
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
    return new Observable<Product>((observer) => {
      this.getProducts().subscribe((products) => {
        const product = products.find((p) => p.id === Number(id));
        if (product) observer.next(product);
        observer.complete();
      });
    });
  }
}
