import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbInputModule,
  NbIconModule,
  NbSelectModule
} from '@nebular/theme';

import { InputGroupComponent } from './components/input-group/input-group.component';
import { SelectGroupComponent } from './components/select-group/select-group.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { KeysPipe } from './pipes/keys.pipe';
import { FormExplainComponent } from './components/form-explain/form-explain.component';

@NgModule({
  declarations: [
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    KeysPipe,
    FormExplainComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule
  ],
  exports: [
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    FormExplainComponent,
    KeysPipe
  ]
})
export class SharedModule { }
