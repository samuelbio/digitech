import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactCuComponent } from './components/contact-cu/contact-cu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactShowComponent } from './components/contact-show/contact-show.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContactComponent,
    ContactListComponent,
    ContactCuComponent,
    ContactShowComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ContactModule { }
