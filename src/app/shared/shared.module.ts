import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [
    FilterPipe
  ],
  exports: [
    FilterPipe,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
