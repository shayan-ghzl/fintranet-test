import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { filtersSelector } from 'src/app/state/selectors/filter.selector';
import { IFilter, IUser } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform, OnDestroy {

  filters!: IFilter;

  subscription = new Subscription();
  constructor(
    private store:Store<AppState>
  ){
    this.subscription.add(
      this.store.select(filtersSelector).subscribe(value => {
        this.filters = value;
      })
    );
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
