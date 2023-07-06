import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { ProductService } from './service/product.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello Shop';

  tern = ' '
  loading = false
  products$ : Observable<IProduct[]>

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true 

    this.products$ = this.productService.getAll().pipe(
    tap(() => this.loading = false))
  }
}
