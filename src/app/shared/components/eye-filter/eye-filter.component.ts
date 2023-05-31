import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IEyeColor, IFilter, IUser } from '../../models/models';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { eyeColorFilterActionUpdate } from 'src/app/state/actions/filter.action';

@Component({
  selector: 'app-eye-filter',
  templateUrl: './eye-filter.component.html',
  styleUrls: ['./eye-filter.component.scss']
})
export class EyeFilterComponent implements OnInit, OnChanges{
  @Input({required: true}) filters!: IFilter;
  @Input({required: true}) users!: IUser[];

  eyeColors: IUser[] = [];
  eyeFormGroup = new FormGroup({});
  subscription = new Subscription();

  constructor(
    private store:Store<AppState>
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm();
  }

  buildForm() {
    const formGroupObject: any = {};
    this.eyeColors = this.uniqBy(this.users, 'eyeColor');
    if(this.eyeColors.length){
      this.eyeColors.forEach((user: IUser) => {
        formGroupObject[user.eyeColor] = new FormControl({ value: false, disabled: false });
      });
      this.eyeFormGroup = new FormGroup(formGroupObject);
    }
  }

  ngOnInit(): void {
    this.eyeFormGroup.setValue(this.filters.eyeColor as IEyeColor, { emitEvent: false });
    this.subscription.add(
      this.eyeFormGroup.valueChanges.pipe(
        switchMap((value) => {
          this.store.dispatch(eyeColorFilterActionUpdate({eyeColor: value as IEyeColor}));
          return EMPTY;
        })
      ).subscribe()
    );
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
