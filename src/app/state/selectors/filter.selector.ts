import { createFeatureSelector } from "@ngrx/store";
import { IFilter } from "src/app/shared/models/models";

export const filtersSelector = createFeatureSelector<IFilter>('filters');
