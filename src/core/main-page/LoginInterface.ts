import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class LoginInterface {
    private static readonly loginUrl = "http://localhost:8080/api";

    public getLoginUrl(): string {
        return LoginInterface.loginUrl;
    } 
}
