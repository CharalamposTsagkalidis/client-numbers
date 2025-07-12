import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginInterface } from "../LoginInterface";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "app-login-page",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    standalone: true,
    imports: [FormsModule, CommonModule],
})

export class LoginComponent {
    private http = inject(HttpClient);
    private loginInterface: LoginInterface = new LoginInterface();
    private readonly loginUrl = this.loginInterface.getLoginUrl()+'';
    username: string = '';
    password: string = '';



    loginFailed() {
        console.log("Login failed. Please check your credentials.");
        this.username = '';
        this.password = '';
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    hasMinLength(password: string): boolean {
        if (password.length < 8) {
            return false;
        }
        return true;

    }

    hasUppercase(password: string): boolean {
        return /[A-Z]/.test(password);
    }

    hasSymbolOrNumber(password: string): boolean {
        return /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    }

    isPasswordValid(): boolean {
        return this.hasMinLength(this.password) && this.hasUppercase(this.password) && this.hasSymbolOrNumber(this.password);
    }

    isUsernameValid(username: string): boolean {
        for (let i = 0; i < username.length; i++) {
            const charCode = username.charCodeAt(i);
            // Check if the character is a letter, digit, or underscore
            if (
                !(charCode >= 48 && charCode <= 57) && // 0-9
                !(charCode >= 65 && charCode <= 90) && // A-Z
                !(charCode >= 97 && charCode <= 122) && // a-z
                charCode !== 95 // _
            ) {
                return false; // Invalid character found
            }
        }

        if (this.username.length < 3 && this.username.length > 100) {
            false;
        }

        return true;
    }

    sendLoginRequest(password:string,username:string) {
        this.http.post(this.loginUrl, { password, username }).subscribe({
            next: (response) => {
                console.log("Login request sent successfully:", response);
                // Handle successful login response here
            },
            error: (error) => {
                console.error("Error sending login request:", error);
                this.loginFailed();
            }
        });
    }

    login() {
        if (this.isPasswordValid()) {
            this.sendLoginRequest(this.password, this.username);
            console.log("Login successful for user:", this.username);
        } else {
            this.loginFailed();
            console.log("Login failed. Password does not meet requirements.");
        }
    }

    getPasswordStrength(): 'weak' | 'medium' | 'strong' | 'empty' {
        const pwd = this.password;
        if (!pwd || pwd.length === 0) return 'empty';
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[0-9]/.test(pwd) || /[!@#$%^&*]/.test(pwd)) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (score <= 1) return "weak";
        if (score === 2) return "medium";
        if (score >= 3) return "strong";
        return 'empty';
    }
}

