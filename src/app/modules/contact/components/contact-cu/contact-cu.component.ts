import { IContact } from 'src/app/modules/contact/models/contact.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/app/core/store/store';
import { of, switchMap, first, filter, map, forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-cu',
  templateUrl: './contact-cu.component.html',
  styles: [
  ]
})
export class ContactCuComponent implements OnInit {

  headerTitle: string = 'Create contact'
  headerSubTitle: string = 'Create contact and submit it'

  contactForm: FormGroup = new FormGroup({})

  private contactId?: string;

  private data: IContact[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store, 
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    })

    forkJoin([
      this.route.paramMap.pipe(first()),
      this.store.select<IContact[]>('contacts').pipe(first())
    ])
    .subscribe(([params, contacts]) => {
      this.data = contacts

      this.contactId = params.get('id') as string
      if (this.contactId) {
        const contact = this.data.find(elt => elt.id === this.contactId)
        if (contact) {
          this.contactForm.patchValue(contact)
        }
        this.headerTitle = 'Edit contact'
      }
    })

  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const value = this.contactForm.value
      if (this.contactId) {
        const index = this.data.findIndex(elt => elt.id === this.contactId)
        this.data.splice(index, 1)
        this.data.push({...value, id: this.contactId})
        this.store.set('contacts', this.data)
      } else {
        this.store.set('contacts', [...this.data, {...value, id: (Math.random() + 1).toString(36).substring(4)}])
      }
      this.location.back()
    } else {
      Object.values(this.contactForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onBack() {
    this.location.back()
  }

}
