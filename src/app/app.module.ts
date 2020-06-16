import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_components/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CsvReaderComponent } from './csvreader/csvreader.component';
import { NgbdDropdownForm } from './_components/dropdown/dropdown-form';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,
    CsvReaderComponent,
    NgbdDropdownForm,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
