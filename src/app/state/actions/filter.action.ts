import { createAction, props } from "@ngrx/store";
import { IAge, IAgeOperation, IEyeColor, IFilter, IGender, IRangeDate } from "src/app/shared/models/models";

export const filtersActionSet = createAction('[Filters] Set', props<{ filters: IFilter }>());
export const dateFilterActionUpdate = createAction('[Filters] Date Update]', props<{ dateFilter: IRangeDate }>());
export const genderFilterActionUpdate = createAction('[Filters] Gender Update]', props<{ gender: IGender }>());
export const ageOperationFilterActionUpdate = createAction('[Filters] Age Update', props<{ operation: IAgeOperation }>());
export const ageFilterActionUpdate = createAction('[Filters] Age Operation Update', props<{ age: IAge }>());
export const eyeColorFilterActionUpdate = createAction('[Filters] Eye Color Update', props<{ eyeColor: IEyeColor }>());