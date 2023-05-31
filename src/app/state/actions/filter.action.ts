import { createAction, props } from "@ngrx/store";
import { IFilter } from "src/app/shared/models/models";

export const filtersActionSet = createAction('[Users Set]', props<{ filters: IFilter }>());