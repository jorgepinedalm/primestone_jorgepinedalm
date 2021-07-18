import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HideLoaderAction, ShowLoaderAction } from '../store/loader.actions';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.store.dispatch(new ShowLoaderAction());

    return next.handle(req).pipe(
      //finalize(() => this.store.dispatch(new HideLoaderAction()))
    );
  }
}