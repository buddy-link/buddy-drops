

export const THEME_PALETTE = 'THEME_PALETTE';
export const TICKETS_SELECTED = 'TICKETS_SELECTED';
export const USER_STEP = 'USER_STEP';
export const TICKETS_OWNED = 'TICKETS_OWNED';
export const REWARDS_EARNED = 'REWARDS_EARNED';
export const DROPS_ERRORS = 'DROPS_ERRORS';
export const DROPS_LOADING = 'DROPS_LOADING';
export const DROPS_SCHEDULE = 'DROPS_SCHEDULE';

export const LOADING_BUY = 'LOADING_BUY';
export const LOADING_CLAIM = 'LOADING_CLAIM';
export const ERROR_MAX_TICKETS = 'ERROR_MAX_TICKETS';

export const PHASE_WHITELIST = 'PHASE_WHITELIST';
export const PHASE_PUBLIC_SALE = 'PHASE_PUBLIC_SALE';
export const PHASE_WAIT = 'PHASE_WAIT';
export const PHASE_CLAIM = 'PHASE_CLAIM';
export const ACTIVE_PHASE = 'ACTIVE_PHASE';

export const initialState = {
  [ACTIVE_PHASE]: PHASE_WHITELIST,
  [THEME_PALETTE]: 'light',
  [TICKETS_SELECTED]: 1,
  [DROPS_LOADING]: {
    [LOADING_BUY]: false,
    [LOADING_CLAIM]: false
  },
  [USER_STEP]: 1,
  [TICKETS_OWNED]: 0,
  [DROPS_ERRORS]: [],
  [DROPS_SCHEDULE]: {
    startWhitelist: new Date(),
    endWhitelist: new Date(new Date().getTime() + 1 * 60 * 1000),
    endPublic: new Date(new Date().getTime() + 2 * 60 * 1000),
    startClaim: new Date(new Date().getTime() + 3 * 60 * 1000)
  },
  [REWARDS_EARNED]: {
    total: 0,
    list: []
  }
};