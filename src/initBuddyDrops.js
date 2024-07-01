import {initBuddyState} from "./buddy";
import {initialState, THEME_PALETTE} from "./state";


export const initBuddyDrops = (updatedState) => {
  initBuddyState({
    ...initialState,
    [THEME_PALETTE]: 'light',
    ...updatedState
  });
};