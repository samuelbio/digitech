import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/modules/contact/models/contact.model';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/core/store/store';
import { first, forkJoin, filter, map } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styles: [
  ]
})
export class ContactShowComponent implements OnInit {

  contact?: IContact

  private data: IContact[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: Location,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.route.paramMap.pipe(
        filter(params => params.has('id')),
        map(params => params.get('id')!),
        first()
      ),
      this.store.select<IContact[]>('contacts').pipe(first())
    ])
    .subscribe(([id, contacts]) => {
      this.data = contacts

      if (id) {
        const contact = this.data.find(elt => elt.id === id)
        if (contact) {
          this.contact = contact
        }
      }
    })
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Do you Want to delete these contact?',
      nzContent: 'Attention after this action, you could not go back !',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
        })
        .then(() => {
          const index = this.data.findIndex(elt => elt.id === this.contact?.id)
          this.data.splice(index, 1)
          this.store.set('contacts', this.data)
          this.location.back()
        })
        .catch(() => console.log('Oops errors!'))
    });
  }

}
