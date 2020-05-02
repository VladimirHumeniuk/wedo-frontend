import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models';
import { CategoriesService } from 'src/app/shared/services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'wd-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  private _queryParams: Subscription
  public category: Category

  public editCategoryForm: FormGroup

  public loading: boolean
  public newItemId: number

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  private formInit(): void {
    this.editCategoryForm = this.formBuilder.group({
      id: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]],
      title: ['', [
        Validators.required
      ]]
    })
  }

  public saveCategory(): boolean {
    this.loading = true

    if (this.editCategoryForm.invalid) {
      this.loading = false
    }

    if (this.editCategoryForm.valid) {
      const formData = this.editCategoryForm.value;

      this.categoriesService.addCategory(formData).toPromise()
        .then(() => {
          if (this.newItemId) {
            this.router.navigate([], {
              queryParams: { id: this.newItemId },
              queryParamsHandling: 'merge'
            })
          }
        })
    }

    return
  }

  ngOnDestroy() {
    this._queryParams.unsubscribe()
  }

  ngOnInit(): void {
    this.formInit();

    this._queryParams = this.activatedRoute.queryParams.subscribe((data: Params) => {
      if (data.id) {
        this.categoriesService.getCategory(parseInt(data.id)).pipe(
          take(1)
        ).subscribe((category: Category) => {
          if (category) {
            Object.keys(category).forEach((key: string) => {
              if (this.editCategoryForm.controls[key]) {
                this.editCategoryForm.controls[key].setValue(category[key])
              }
            })
          }
        })
      } else {
        this.categoriesService.getAllCategories().pipe(
          take(1)
        ).subscribe((data: Category[]) => {
          this.newItemId = Math.floor(100000 + Math.random() * 900000)
          this.editCategoryForm.controls['id'].setValue(this.newItemId)
        })
      }
    })
  }

}
