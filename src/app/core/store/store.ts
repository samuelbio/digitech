import { ContactData } from './../../modules/contact/mocks/contact.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { State } from '../state/state';
import { Injectable } from '@angular/core';

const state:State = {
    contacts: ContactData
};


@Injectable({
  providedIn: 'root'
})
export class Store {

    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value(){ return this.subject.value;}

    /**
     * function permettant de recuperer la donnée store 
     * @param name Action
     */
    select<T>(name: string): Observable<any>{
        return this.store.pipe(pluck(name));
    }

    /**
     * function permettant de stocker des données en local
     * @param name STRING 
     * @param state ANY la valeur à enregistrer
     */
    set(name:string, state: any){
        this.subject.next({
            ...this.value, 
            [name]: state
        })
    }
}