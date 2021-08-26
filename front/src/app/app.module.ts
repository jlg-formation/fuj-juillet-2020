import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './home/home.component';
import { HttpArticleService } from './services/http-article.service';
import { LegalComponent } from './legal/legal.component';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, LegalComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule],
  providers: [{ provide: ArticleService, useClass: HttpArticleService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
