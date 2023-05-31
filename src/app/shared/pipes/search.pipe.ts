import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/models';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: IUser[] | null, inputVal: string, fields: string[]): IUser[] | null {
    if(value){
      return this.search(inputVal, value, fields);
    }
    return value;
  }

  search(value: string, list: IUser[], fields: string[]){
    const keyword = value.trim().toLowerCase();
    return list.filter(x => this.searchInFields(x, fields).includes(keyword));
  }

  searchInFields(model: any, fields: string[]){
    const temp: string[] = [];
    fields.forEach((field) => {
      temp.push(model[field].toString().trim().toLowerCase());
    });
    return temp.join(' ');
  }

}
