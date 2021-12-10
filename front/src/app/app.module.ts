import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialsInterceptor } from '@jlguenego/angular-tools';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { ArticleService } from './services/article.service';
import { HttpArticleService } from './services/http-article.service';
import { Error404Component } from './routes/error404/error404.component';
import { Error403Component } from './routes/error403/error403.component';

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
    { provide: ArticleService, useClass: HttpArticleService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
