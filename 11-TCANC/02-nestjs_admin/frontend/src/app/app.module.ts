import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SecureModule, PublicModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
