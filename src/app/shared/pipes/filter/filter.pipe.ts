import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], search: string, attributs: string[] = []): any[] {
    // make recursive search child attribut to get value
    return search ? data.filter(elt => {
      const tab = attributs.map(attr => {
        const attrs = attr.split('.')
        let value: string = '';
        if (attrs.length > 1) {
          // value = elt[attrs][][]
        } else {
          value = elt[attr] as string;
        }
        return value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      });
      return tab.includes(true);
    }): data;
  }

}
