import { APP_BASE_HREF, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { PRESERVED_QUERY_PARAM_KEYS_TOKEN } from '../injection-tokens';

/**
 * Used to globally preserve query params when routing
 *
 * @see https://www.evergreen.engineer/a-neat-trick-to-globally-preserve-query-params-in-angular-router/
 * @see https://github.com/angular/angular/issues/12664
 *
 * @example
 * @NgModule({
 *   //...
 *   providers: [
 *     { provide: LocationStrategy, useClass: PreserveQueryParamsPathLocationStrategy },
 *   ],
 *   bootstrap: [AppComponent],
 *   })
 * export class AppModule {
 *   constructor() {}
 * } 
 */
@Injectable()
export class PreserveQueryParamsPathLocationStrategy extends PathLocationStrategy {
  constructor(
    private platformLocation: PlatformLocation,
    private urlSerializer: UrlSerializer,
    @Optional() @Inject(APP_BASE_HREF) baseHref?: string,
    @Optional() @Inject(PRESERVED_QUERY_PARAM_KEYS_TOKEN) private preservedKeys?: string[]
  ) {
    super(platformLocation, baseHref);
  }

  override prepareExternalUrl(internal: string): string {
    const path = super.prepareExternalUrl(internal);
    const existingURLSearchParams = new URLSearchParams(this.search);
    const existingQueryParams = Object.fromEntries(existingURLSearchParams.entries());

    const urlTree = this.urlSerializer.parse(path);
    const nextQueryParams = urlTree.queryParams;

    const preservedQueryParams = this.preservedKeys?.reduce((obj, key) => {
      const queryParamValue: string | undefined = existingQueryParams[key];
      return { ...obj, ...(!!queryParamValue && { [key]: queryParamValue }) };
    }, {});

    urlTree.queryParams = { ...preservedQueryParams, ...nextQueryParams };

    return urlTree.toString();
  }

  get search(): string {
    return this.platformLocation?.search ?? '';
  }
}
