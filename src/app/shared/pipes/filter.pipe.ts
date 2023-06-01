import { Pipe, PipeTransform } from '@angular/core';
import { IFilter, IUser } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  filters!: IFilter;

  transform(value: IUser[] | null, inputVal: string, fields: string[], filters?: IFilter | null): IUser[] | null {
    if(value){
      return this.search(inputVal, value, fields, filters);
    }
    return value;
  }

  search(value: string, list: IUser[], fields: string[], filters?: IFilter | null){
    const keyword = value.trim().toLowerCase();
    let temp: IUser[] = [];
    temp = list.filter(x => this.searchInFields(x, fields).includes(keyword));
    if(filters){
      this.filters = filters;
      temp = this.genderSearch(temp);
      temp = this.ageSearch(temp);
      temp = this.eyeColorSearch(temp);
      temp = this.birthDateSearch(temp);
      return temp;
    }
    return temp;
  }

  genderSearch(list: IUser[]){
    if (list.length === 0) {
      return list;
    }
    const temp: string[] = [];
    for (const [key, value] of Object.entries(this.filters.gender)) {
      if (value) {
        temp.push(key);
      }
    }
    return list.filter(x => temp.includes(x.gender));
  }

  ageSearch(list: IUser[]){
    if (list.length === 0 || this.filters.age.value === 0) {
      return list;
    }
    let temp: IUser[] = [];
    if (this.filters.age.operation.equal) {
      temp = list.filter(x => this.filters.age.value === x.age);
    }
    if (this.filters.age.operation.greater) {
      temp = temp.concat(list.filter(x => this.filters.age.value < x.age));
    }
    if (this.filters.age.operation.smaller) {
      temp = temp.concat(list.filter(x => this.filters.age.value > x.age));
    }
    return temp;
  }

  eyeColorSearch(list: IUser[]){
    if (list.length === 0) {
      return list;
    }
    const temp: string[] = [];
    for (const [key, value] of Object.entries(this.filters.eyeColor)) {
      if (value) {
        temp.push(key);
      }
    }
    return list.filter(x => (temp.length) ? temp.includes(x.eyeColor) : x);
  }

  birthDateSearch(list: IUser[]){
    if (list.length === 0) {
      return list;
    }
    let condition = (user: IUser) => (new Date(user.birthDate) === this.filters.birthDate[0]);
    if (this.filters.birthDate[1] !== null) {
      condition = (user: IUser) => (new Date(user.birthDate) >= this.filters.birthDate[0] && new Date(user.birthDate) <= this.filters.birthDate[1]!);
    }
    return list.filter(x => condition(x));
  }

  searchInFields(model: any, fields: string[]){
    const temp: string[] = [];
    fields.forEach((field) => {
      temp.push(model[field].toString().trim().toLowerCase());
    });
    return temp.join(' ');
  }

}
