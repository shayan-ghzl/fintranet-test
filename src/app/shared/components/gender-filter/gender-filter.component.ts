import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { genderFilterActionUpdate } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';
import { IFilter, IGender } from '../../models/models';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderFilterComponent implements OnInit, OnDestroy{

  @Input({required: true}) filters!: IFilter;

  genderFormGroup = new FormGroup({
    female: new FormControl({ value: false, disabled: false }),
    male: new FormControl({ value: false, disabled: false }),
    others: new FormControl({ value: false, disabled: false }),
  });

  subscription = new Subscription();

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
    this.genderFormGroup.setValue(this.filters.gender as IGender, { emitEvent: false });
    this.subscription.add(
      this.genderFormGroup.valueChanges.pipe(
        switchMap((value) => {
          this.store.dispatch(genderFilterActionUpdate({gender: value as IGender}));
          return EMPTY;
        })
      ).subscribe()
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}