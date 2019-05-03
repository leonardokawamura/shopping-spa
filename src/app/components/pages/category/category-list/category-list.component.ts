import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CategoryNewModalComponent
} from '../category-new-modal/category-new-modal.component';
import {
  CategoryEditModalComponent
} from '../category-edit-modal/category-edit-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  categoryId: number;

  constructor(private http: HttpClient) {}

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  ngOnInit() {
    this.getCategories();
  }



  getCategories() {
    const token = window.localStorage.getItem('token');
    this.http.get < {
      data: Array < any >
    } > ('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
    });
  }

  showModalInsert() {
    this.categoryNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
  }

  showModalEdit(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryEditModal.showModal();
  }

  onEditSuccess($event: any) {
    this.getCategories();
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
  }
}
