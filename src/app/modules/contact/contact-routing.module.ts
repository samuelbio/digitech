import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCuComponent } from './components/contact-cu/contact-cu.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactShowComponent } from './components/contact-show/contact-show.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [{
  path: '', component: ContactComponent,
  children: [
    // in case we want set child component or child module
    {
      path: '',
      component: ContactListComponent
    },
    {
      path: 'create', 
      component: ContactCuComponent
    },
    {
      path: 'edit/:id', 
      component: ContactCuComponent
    },
    {
      path: 'show/:id', 
      component: ContactShowComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
