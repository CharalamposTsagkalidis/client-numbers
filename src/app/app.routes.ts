import { Routes } from '@angular/router';
import { MainPageComponent } from '../core/main-page/main-page.component';
export const routes: Routes = [
    //this is main page but is going to be in parent route
    
   {path: '', component:MainPageComponent},
   {path: 'app', loadComponent: () => import('../app/app').then(m => m.App)

   },
   {path: '**', redirectTo: ''}

    
];
