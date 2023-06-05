import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { ageFilterActionUpdate, ageOperationFilterActionUpdate } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';
import { IAge, IAgeOperation, IFilter, IUser } from '../../models/models';

@Component({
  selector: 'app-age-filter',
  templateUrl: './age-filter.component.html',
  styleUrls: ['./age-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgeFilterComponent implements OnDestroy{

  @Input({required: true}) filters!: IFilter;
  @Input({required: true}) users!: IUser[] | null;

  ageFormGroup = new FormGroup({
    operation: new FormGroup({
      equal: new FormControl({ value: false, disabled: false }),
      greater: new FormControl({ value: false, disabled: false }),
      smaller: new FormControl({ value: false, disabled: false }),
    }),
    value: new FormControl({ value: 0, disabled: false }),
  });

  subscription = new Subscription();

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
    this.ageFormGroup.setValue(this.filters.age as IAge, { emitEvent: false });
    this.subscription.add(
      this.ageFormGroup.controls.operation.valueChanges.pipe(
        switchMap((value) => {
          this.store.dispatch(ageOperationFilterActionUpdate({operation: value as IAgeOperation}));
          return EMPTY;
        })
      ).subscribe()
    );
  }

  onDropdownShow(target: HTMLInputElement){
    target.value = '';
    target.classList.remove('is-invalid');
    setTimeout(() => {
      target.focus(); 
    }, 0); 
  }

  ageChanged(target: HTMLInputElement){
    if (!/^\d+$/.test(target.value.trim())) {
      target.classList.add('is-invalid');
      return;
    }
    target.classList.remove('is-invalid');
  }

  ageEnterPressed(age: string){
    this.ageFormGroup.patchValue({'value': +age}, { emitEvent: false });
    this.store.dispatch(ageFilterActionUpdate({age: this.ageFormGroup.value as IAge}));
  }

  selectAge(age: number, ageInput: HTMLInputElement){
    ageInput.value = age.toString();
    ageInput.classList.remove('is-invalid');
    this.ageFormGroup.patchValue({'value': age}, { emitEvent: false });
    this.store.dispatch(ageFilterActionUpdate({age: this.ageFormGroup.value as IAge}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
