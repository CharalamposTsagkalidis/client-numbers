import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class RegisterInterface {
    private static readonly registerUrl = "http://localhost:8080/api/register";

    public getRegisterUrl(): string {
        return RegisterInterface.registerUrl;
    } 
}