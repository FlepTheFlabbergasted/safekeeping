import { InjectionToken } from '@angular/core';
import { Environment } from './models/environment.models';

export const ENVIRONMENT_API_PATH_TOKEN = new InjectionToken<string>('Environment API path');

export const WINDOW_TOKEN = new InjectionToken<Window>('Window object');

export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('Environment object');