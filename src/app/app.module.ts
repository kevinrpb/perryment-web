/* Angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/* App imports */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Config imports */
import { environment } from '../environments/environment';

/* Component imports */
import { AuthGuard } from './core/auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';

import { TournamentsComponent } from './tournaments/tournaments.component';
import { ListTournamentsComponent } from './tournaments/list-tournaments/list-tournaments.component';

import { AdminComponent } from './admin/admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';

import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    TournamentsComponent,
    ListTournamentsComponent,
    AdminComponent,
    UsersAdminComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
