import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RegisterInterface } from "../RegisterInterface";

@Component({
    selector: "app-register-page",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
    private http = inject(HttpClient);
    private registerInterface: RegisterInterface = new RegisterInterface();
    private readonly registerUrl = this.registerInterface.getRegisterUrl() + '/register/';
    username: string = '';
    password: string = '';
    
    register() {
        console.log("Register function called");

    }
}