import { Routes } from '@angular/router';
import { AdminComponent } from '../Pages/Admin/admin.component';
import { AdminGuard } from '../Guards/Admin.guard';
import { LoginComponent } from '../Pages/Login/login.component';

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: []
  },
  {
    path: '',
    component: LoginComponent
  },

];
