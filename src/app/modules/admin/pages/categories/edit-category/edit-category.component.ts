import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  private formInit(): void {
    this.editCategoryForm = this.formBuilder.group({
      id: ['', [
        Validators.required,
        Validators.min(1)
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

      console.log('🚧  formData =>', formData)
    }

    return
  }

  ngOnDestroy() {
    this._queryParams.unsubscribe()
  }

  ngOnInit(): void {
    this.formInit();

    this._queryParams = this.activatedRoute.queryParams.subscribe((data: Params) => {
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
    })
  }

}
