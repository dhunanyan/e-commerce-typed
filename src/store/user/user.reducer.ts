import { User } from "firebase/auth";
import { AnyAction } from "redux";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action.type)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action.type)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action.type) ||
    signUpFailed.match(action.type) ||
    signOutFailed.match(action.type)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};
