import { sharedActions } from "./slice";
export const increaseCounter = (num) => sharedActions.increment(num);
export const decreaseCounter = (num) => sharedActions.decrement(num);
