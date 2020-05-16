import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ListTournamentsComponent } from './tournaments/list-tournaments/list-tournaments.component';

import { Page404Component } from './page404/page404.component';
import { AdminComponent } from './admin/admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { DetailTournamentsComponent } from './tournaments/detail-tournaments/detail-tournaments.component';

const routes: Routes = [
  /* Home */
  {
    path: '',
    component: HomeComponent,
  },

  /* Auth */
  {
    path: 'login',
    component: LogInComponent,
  },

  {
    path: 'tournaments',
    children: [
      /* Tournaments -> public section */
      {
        path: '',
        component: TournamentsComponent,
      },
      {
        path: 't-list',
        component: ListTournamentsComponent,
        outlet: 'section'
      },
      {
        path: 't-detail/:tid',
        component: DetailTournamentsComponent,
        outlet: 'section',
      },
    ]
  },

  /* Error */
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
