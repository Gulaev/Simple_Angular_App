import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, delay, retry, throwError } from "rxjs";
import { IProduct } from "../models/product";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor (
        private http: HttpClient,
        private errorService: ErrorService) {
    }

    getAll() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
            params: new HttpParams( {
                fromObject : {limit : 100}
            })
        }).pipe(
            delay(200),
            retry(2),
            catchError(this.errorHandler.bind(this)))
    }

    public create(product:IProduct):Observable<IProduct> {
        return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
    }

    private errorHandler(error : HttpErrorResponse) {
        this.errorService.handler(error.message)
        return throwError(() => error.message)
    }
}
