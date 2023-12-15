import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentcrudComponent } from './studentcrud/studentcrud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SortableModule } from 'ngx-bootstrap/sortable';


@NgModule({
  declarations: [
    AppComponent,
    StudentcrudComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    SortableModule.forRoot(),

    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }