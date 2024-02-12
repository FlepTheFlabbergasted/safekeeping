import { LoadState } from "./types";

export const INITIAL_LOADING_STATE: LoadState = { isLoading: false, hasLoaded: false, hasError: false };
export const LOADING_STATE_IS_LOADING: LoadState = { isLoading: true, hasLoaded: false, hasError: false };
export const LOADING_STATE_HAS_LOADED: LoadState = { isLoading: false, hasLoaded: true, hasError: false };
export const LOADING_STATE_HAS_ERROR: LoadState = { isLoading: false, hasLoaded: false, hasError: true };
