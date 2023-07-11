import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  constructor(private productService: ProductService,
              private modalService: ModalService) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ])
  })

  submit(){
    this.productService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: "Description",
      image: "https://i.pravatar.cc",
      category: 'electronic',
      rating: {
        rate: 42,
        count: 1
      }
    }).subscribe(()=>this.modalService.close())
   

  }

  get title() {
    return this.form.controls.title as FormControl
  }
  
  ngOnInit(): void {

  }
}
