import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";


@Component({
    selector: "app-root",
    template: `
       <nav>
      <a routerLink="/" routerLinkActive="active">Main Page</a> |
      <a routerLink="/app" routerLinkActive="active">App Page</a>g
      <a routerLink="/login" routerLinkActive="active">Login Page</a>
    </nav>
    <hr />
    <router-outlet></router-outlet>
     `,
    imports:[RouterModule]
   
   //css for the root
    // nav a {
    //   padding: 8px;
    //   text-decoration: none;
    //   color: #007bff;
    // }
    // nav a.active {
    //   font-weight: bold;
    //   text-decoration: underline;
    // }
})

export class RootComponent { }