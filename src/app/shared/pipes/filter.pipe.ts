import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: IUser[] | null, inputVal: string): IUser[] | null {
    if(value){
      return this.search(inputVal, value);
    }
    return value;
  }

  search(value: string, list: IUser[]){
    const keyword = value.trim().toLowerCase();
    return list.filter(x => x.firstName.trim().toLowerCase().includes(keyword) || x.lastName.trim().toLowerCase().includes(keyword));
  }
}
