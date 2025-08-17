import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-register-page",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
    private http = inject(HttpClient);

    register() {
        console.log("Register function called");

    }
}