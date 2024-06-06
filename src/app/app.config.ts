import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTE } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTE),
    provideClientHydration(),
    provideAnimationsAsync()]
};
