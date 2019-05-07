import {
  ProductHttpService
} from 'src/app/services/http/product-http.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Product,
  ProductCategory,
  Category
} from 'src/app/model';
import {
  ProductCategoryHttpService
} from 'src/app/services/http/product-category-http.service';
import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  NotifyMessageService
} from 'src/app/services/notify-message.service';
@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;

  product: Product = null;

  productCategory: ProductCategory = null;



  constructor(
    private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productCategoryHttp: ProductCategoryHttpService,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params.product;
      this.getProduct();
      this.getProductCategory();
    });
  }

  getProduct() {
    this.productHttp.get(this.productId).subscribe(
      (product) => {
        this.product = product;
      }
    );
  }

  getProductCategory() {
    this.productCategoryHttp.list(this.productId).subscribe(
      (response) => {
        this.productCategory = response;
        // console.log(response);
      }
    );
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Categorias incluidas com sucesso');
    this.getProductCategory();
  }

  onInsertError($event: HttpErrorResponse) {
    this.notifyMessage.error('Erro ao cadastrar categoria no produto');
    console.log($event);
  }
}
