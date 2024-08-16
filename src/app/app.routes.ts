import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { CreatepostComponent } from './screens/createpost/createpost.component';
import { RegisterComponent } from './screens/register/register.component';
import { ViewpostComponent } from './screens/viewpost/viewpost.component';
import { MyfavouritesComponent } from './screens/myfavourites/myfavourites.component';
export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'createpost',
    component: CreatepostComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  { path: 'Viewpost/:id', component: ViewpostComponent },
  {
    path: 'myfavourites',
    component: MyfavouritesComponent,
  },

  { path: '**', redirectTo: '' },
];
