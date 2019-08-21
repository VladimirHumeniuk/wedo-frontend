import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbAlertModule,
  NbInputModule,
  NbIconModule,
  NbSelectModule
} from '@nebular/theme';

import { InputGroupComponent } from './components/input-group/input-group.component';
import { SelectGroupComponent } from './components/select-group/select-group.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { KeysPipe } from './pipes/keys.pipe';
import { FormExplainComponent } from './components/form-explain/form-explain.component';
import { FromCamelCasePipe } from './pipes/from-camel-case.pipe';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';

@NgModule({
  declarations: [
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    KeysPipe,
    FormExplainComponent,
    FromCamelCasePipe,
    AlertMessageComponent,
    FileDropzoneComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule
  ],
  exports: [
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    FormExplainComponent,
    KeysPipe,
    FromCamelCasePipe,
    AlertMessageComponent,
    FileDropzoneComponent
  ]
})
export class SharedModule { }
