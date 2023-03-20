import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatirialModule } from './matirial.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from './helpers/http-error.interceptor';
import { AuthEffects } from './auth/store/auth.effects';
import { RootStoreModule } from './root-store/root-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatirialModule,
    RootStoreModule,
    //StoreModule.forRoot({}, {}),

    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
