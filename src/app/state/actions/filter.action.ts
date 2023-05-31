import { createAction, props } from "@ngrx/store";
import { IAge, IEyeColor, IFilter, IGender, IRangeDate } from "src/app/shared/models/models";

export const filtersActionSet = createAction('[Filters Set]', props<{ filters: IFilter }>());
export const dateFilterActionUpdate = createAction('[Date Filter Update]', props<{ dateFilter: IRangeDate }>());
export const genderFilterActionUpdate = createAction('[Gender Filter Update]', props<{ gender: IGender }>());
export const ageFilterActionUpdate = createAction('[Age Filter Update]', props<{ age: IAge }>());
export const eyeColorFilterActionUpdate = createAction('[Eye Color Filter Update]', props<{ eyeColor: IEyeColor }>());