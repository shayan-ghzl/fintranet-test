import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { eyeColorFilterActionUpdate } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';
import { IEyeColor, IFilter, IUser } from '../../models/models';

@Component({
  selector: 'app-eye-filter',
  templateUrl: './eye-filter.component.html',
  styleUrls: ['./eye-filter.component.scss']
})
export class EyeFilterComponent implements OnChanges{
  @Input({required: true}) filters!: IFilter;
  @Input({required: true}) users!: IUser[] | null;

  eyeColors: IUser[] = [];
  eyeFormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>
  ){ }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.buildForm();
    }
  }

  buildForm() {
    const formGroupObject: any = {};
    this.eyeColors = this.uniqBy(this.users!, 'eyeColor');
    if(this.eyeColors.length){
      this.eyeColors.forEach((user: IUser) => {
        formGroupObject[user.eyeColor] = new FormControl({ value: this.filters.eyeColor[user.eyeColor], disabled: false });
      });
      this.eyeFormGroup = new FormGroup(formGroupObject);
    }
  }
  
  inputChanged(){
    this.store.dispatch(eyeColorFilterActionUpdate({eyeColor: this.eyeFormGroup.value as IEyeColor}));
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
