import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-login-page",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    standalone: true,
    imports: [FormsModule, CommonModule],
})

export class LoginComponent {
    username: string = '';
    password: string = '';



    loginFailed(){
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    hasMinLength(password:string): boolean {
        if(password.length < 8) {
            return false;
        }
        return true;

    }

    hasUppercase(password:string): boolean {
        return /[A-Z]/.test(password);
    }

    hasSymbolOrNumber(password:string): boolean {
        return /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    }

    isPasswordValid(): boolean {
        return this.hasMinLength(this.password) && this.hasUppercase(this.password) && this.hasSymbolOrNumber(this.password);
    }

    login() {
        if (this.isPasswordValid()) {
            // Perform login logic here
            console.log("Login successful for user:", this.username);
        } else {
            this.loginFailed();
            console.log("Login failed. Password does not meet requirements.");
        }
    }

    getPasswordStrength(): 'weak' | 'medium' | 'strong' | 'empty' {
        const pwd = this.password;
        if(!pwd || pwd.length ===0) return 'empty';
        let score =0;
        if(pwd.length >= 8) score ++;
        if (/[0-9]/.test(pwd) || /[!@#$%^&*]/.test(pwd)) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if(score <=1) return "weak";
        if(score === 2) return "medium";
        if(score >= 3) return "strong";
        return 'empty';
    }
}

