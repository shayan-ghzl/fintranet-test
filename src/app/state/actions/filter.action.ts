import { createAction, props } from "@ngrx/store";
import { IAge, IAgeOperation, IEyeColor, IFilter, IGender, IRangeDate } from "src/app/shared/models/models";

export const filtersActionSet = createAction('[Filters Set]', props<{ filters: IFilter }>());
export const dateFilterActionUpdate = createAction('[Date Filter Update]', props<{ dateFilter: IRangeDate }>());
export const genderFilterActionUpdate = createAction('[Gender Filter Update]', props<{ gender: IGender }>());
export const ageOperationFilterActionUpdate = createAction('[Age Filter Update]', props<{ operation: IAgeOperation }>());
export const ageFilterActionUpdate = createAction('[Age Operation Filter Update]', props<{ age: IAge }>());
export const eyeColorFilterActionUpdate = createAction('[Eye Color Filter Update]', props<{ eyeColor: IEyeColor }>());