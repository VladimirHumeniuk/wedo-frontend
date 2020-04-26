import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'

import { NgSelectModule } from '@ng-select/ng-select';
import {
  NbAlertModule,
  NbButtonModule,
  NbTooltipModule,
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
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { SelectComponent } from './components/select/select.component';
import { TipOffComponent } from './components/tip-off/tip-off.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    KeysPipe,
    FormExplainComponent,
    FromCamelCasePipe,
    AlertMessageComponent,
    FileDropzoneComponent,
    WysiwygComponent,
    ContentEditableDirective,
    SelectComponent,
    TipOffComponent,
    LogoComponent
  ],
  imports: [
    NgSelectModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbTooltipModule
  ],
  exports: [
    LogoComponent,
    InputGroupComponent,
    SelectGroupComponent,
    FormItemComponent,
    FormExplainComponent,
    KeysPipe,
    FromCamelCasePipe,
    AlertMessageComponent,
    FileDropzoneComponent,
    WysiwygComponent,
    ContentEditableDirective,
    SelectComponent,
    TipOffComponent
  ]
})
export class SharedModule { }
