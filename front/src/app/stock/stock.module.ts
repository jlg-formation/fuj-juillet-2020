import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JlgWidgetsModule } from '@jlguenego/angular-tools';
import { WidgetModule } from '../widget/widget.module';
import { AddComponent } from './add/add.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { ArticleComponent } from './article/article.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [StockComponent, AddComponent, ArticleComponent, UpdateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    WidgetModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JlgWidgetsModule,
  ],
})
export class StockModule {}
