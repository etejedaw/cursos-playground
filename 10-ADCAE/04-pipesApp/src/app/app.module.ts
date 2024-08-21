import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localesEsCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localesEsCL);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
