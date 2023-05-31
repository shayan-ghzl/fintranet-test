import { Pipe, PipeTransform } from '@angular/core';
import { IFilter, IUser } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  filters!: IFilter | null;

  transform(value: IUser[] | null, inputVal: string, fields: string[], filters: IFilter | null): IUser[] | null {
    this.filters = filters;
    if(value){
      return this.search(inputVal, value, fields);
    }
    return value;
  }

  search(value: string, list: IUser[], fields: string[]){
    const keyword = value.trim().toLowerCase();
    let temp: IUser[] = [];
    temp = list.filter(x => this.searchInFields(x, fields).includes(keyword));
    temp = this.genderSearch(temp);
    temp = this.ageSearch(temp);
    temp = this.eyeColorSearch(temp);
    temp = this.birthDateSearch(temp);
    return temp;
  }

  genderSearch(list: IUser[]){
    let temp: string[] = [];
    for (const [key, value] of Object.entries((this.filters && this.filters.gender) || {})) {
      if (value) {
        temp.push(key);
      }
    }
    console.log(list.filter(x => temp.includes(x.gender)));
    return list.filter(x => temp.includes(x.gender));
  }

  ageSearch(list: IUser[]){
    return list;
  }

  eyeColorSearch(list: IUser[]){
    let temp: string[] = [];
    for (const [key, value] of Object.entries((this.filters && this.filters.eyeColor) || {})) {
      if (value) {
        temp.push(key);
      }
    }
    return list.filter(x => (temp.length) ? temp.includes(x.eyeColor) : x);
  }

  birthDateSearch(list: IUser[]){
    return list;
  }

  searchInFields(model: any, fields: string[]){
    const temp: string[] = [];
    fields.forEach((field) => {
      temp.push(model[field].toString().trim().toLowerCase());
    });
    return temp.join(' ');
  }

}
