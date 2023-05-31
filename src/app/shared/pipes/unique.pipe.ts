import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/models';

@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {

  transform(value: IUser[] | null, predicate: string): IUser[] | null {
    if(value){
      return this.uniqBy(value, predicate);
    }
    return value;
  }
  
  uniqBy(arr: IUser[], predicate: string) {
    if (!Array.isArray(arr)) { return []; }
    
    const pickedObjects = arr
      .reduce((map, item: IUser) => {
          const key = (<any>item)[predicate];
          if (!key) { return map; }
          return map.has(key) ? map : map.set(key, item);
      }, new Map<string, IUser>())
      .values();
   
    return [...pickedObjects];
  }
  
}
