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

const routes: Routes = [
  /* Home */
  {
    path: '',
    component: HomeComponent,
  },

  /* App */
  {
    path: 'app',
    children: [
      /* Auth */
      {
        path: 'login',
        component: LogInComponent,
      },

      /* Tournaments -> public section */
      {
        path: 'tournaments',
        component: TournamentsComponent,
        children: [
          /* Base redirect */
          {
            path: '',
            redirectTo: '/app/(tournaments//section:t-list)',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 't-list',
        component: ListTournamentsComponent,
        outlet: 'section'
      },

      /* Admin -> private section */
      {
        path: 'admin',
        component: AdminComponent,
        // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/app/(admin//section:a-users)',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'a-users',
        component: UsersAdminComponent,
        outlet: 'section'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
