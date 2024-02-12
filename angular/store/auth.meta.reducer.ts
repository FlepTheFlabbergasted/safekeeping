import { Action, ActionReducer } from '@ngrx/store';
import { authenticationSuccessNoUser, logoutRequest } from './auth.actions';

export function clearStateMetaReducer<State extends object>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function clearStateFn(state: State | undefined, action: Action) {
    if (action.type === logoutRequest.type || action.type === authenticationSuccessNoUser.type) {
      state = {} as State;
    }

    return reducer(state, action);
  };
}
