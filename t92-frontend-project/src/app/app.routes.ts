import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UsersComponent } from './component/users/users.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'home', component: HomeComponent }
  ];
