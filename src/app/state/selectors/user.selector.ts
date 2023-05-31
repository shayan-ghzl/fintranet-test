import { createFeatureSelector } from "@ngrx/store";
import { IUser } from "src/app/shared/models/models";

export const userSelector = createFeatureSelector<IUser[]>('users');
