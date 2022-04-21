import { IContact } from 'src/app/modules/contact/models/contact.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/core/store/store';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styles: [
  ]
})
export class ContactListComponent implements OnInit {

  listOfData: IContact[] = [];

  contacts: IContact[] = [];

  search: string = '';

  public readonly attributs: string[] = [
    'firstName',
    'lastName',
  ]

  constructor(
    private store: Store,
    private router: Router,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.store.select<IContact[]>('contacts')
    .subscribe((data: IContact[]) => {
      this.listOfData = [...data].sort((a: IContact, b: IContact) => {
        return a.firstName.toLocaleLowerCase() < b.firstName.toLocaleLowerCase() ? -1 : 1
      })
      this.contacts = data
    })
  }

  onCreate() {
    this.router.navigate(['contacts/create'])
  }
  
  showConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to delete these contact?',
      nzContent: 'Attention after this action, you could not go back !',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
        })
        .then(() => {
          const index = this.listOfData.findIndex(elt => elt.id === id)
          this.listOfData.splice(index, 1)
          this.store.set('contacts', this.listOfData)
        })
        .catch(() => console.log('Oops errors!'))
    });
  }

  onSearch(search: any): void {
    if (search) {
      this.listOfData = this.contacts.filter((item: IContact) => {
        return item.firstName.toLocaleLowerCase().indexOf(search) !== -1 
        || item.lastName.toLocaleLowerCase().indexOf(search) !== -1
      }).sort((a: IContact, b: IContact) => {
        return a.firstName.toLocaleLowerCase() < b.firstName.toLocaleLowerCase() ? -1 : 1
      });
    } else {
      this.listOfData = this.contacts.sort((a: IContact, b: IContact) => {
        return a.firstName.toLocaleLowerCase() < b.firstName.toLocaleLowerCase() ? -1 : 1
      })
    }
  }

}
