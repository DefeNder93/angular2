import {
  BaseRequestOptions,
  BaseResponseOptions, BrowserXhr, Http, RequestOptions,
  ResponseOptions,
  XHRBackend, XSRFStrategy
} from "@angular/http";

// HTTP configuration to use the http service outside of angular2
export const HTTP_PROVIDERS = [
  {provide: XSRFStrategy, useClass: XSRFStrategy},
  {provide: Http, useFactory:
    (xhrBackend: XHRBackend, requestOptions: RequestOptions): Http =>
      new Http(xhrBackend, requestOptions),
    deps: [XHRBackend, RequestOptions]},
  BrowserXhr,
  {provide: RequestOptions, useClass: BaseRequestOptions},
  {provide: ResponseOptions, useClass: BaseResponseOptions},
  XHRBackend
];
