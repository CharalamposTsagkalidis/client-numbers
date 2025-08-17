import { Routes } from '@angular/router';
import { MainPageComponent } from '../core/main-page/main-page.component';
export const routes: Routes = [
    //this is main page but is going to be in parent route
    
   {path: '', component:MainPageComponent},
   {path:'login',loadComponent: () => import('../core/main-page/login/login.component').then(m => m.LoginComponent)},
   {path: 'register', loadComponent: () => import('../core/main-page/register/register.component').then(m => m.RegisterComponent)},
   {path: 'app', loadComponent: () => import('../app/app').then(m => m.App)},
   {path: '**', redirectTo: ''}

    
];
