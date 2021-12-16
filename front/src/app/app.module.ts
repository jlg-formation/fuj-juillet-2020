import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CredentialsInterceptor } from '@jlguenego/angular-tools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { Error403Component } from './routes/error403/error403.component';
import { Error404Component } from './routes/error404/error404.component';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LegalComponent,
    Error404Component,
    Error403Component,
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
