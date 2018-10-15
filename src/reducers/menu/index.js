import * as constants from '@tabdigital/events/menu/constants';

import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.OPEN_MENU:
      return {
        ...state,
      };
    default:
      return state;
  }
};
