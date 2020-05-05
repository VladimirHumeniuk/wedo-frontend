import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models';
import { CategoriesService } from 'src/app/shared/services';
import { take, takeUntil } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { SafeComponent } from 'src/app/shared/helpers';

@Component({
  selector: 'wd-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent extends SafeComponent implements OnInit {

  public category: Category

  public editCategoryForm: FormGroup

  public loading: boolean
  public newItemId: number

  constructor(
    private readonly toastrService: NbToastrService,
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

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
        .finally(() => {
          this.router.navigate(['/admin-panel/categories'])
          this.toastrService.success('Successfully saved', 'Saved')
        })
    }

    return
  }

  ngOnInit(): void {
    this.formInit();

    this.activatedRoute.queryParams.subscribe((data: Params) => {
      if (data.id) {
        this.categoriesService.getCategory(parseInt(data.id)).pipe(
          take(1),
          takeUntil(this.unsubscriber)
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
          take(1),
          takeUntil(this.unsubscriber)
        ).subscribe((data: Category[]) => {
          this.newItemId = Math.floor(100000 + Math.random() * 900000)
          this.editCategoryForm.controls['id'].setValue(this.newItemId)
        })
      }
    })
  }

}
