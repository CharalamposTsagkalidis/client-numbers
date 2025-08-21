import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RegisterInterface } from "../RegisterInterface";
import { Subject } from "rxjs/internal/Subject";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { filter, Observable, switchMap } from "rxjs";

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
    private readonly registerUrl = this.registerInterface.getRegisterUrl();
    private readonly checkUsernameUrl = this.registerInterface.getRegisterUrl() + '/check-username';
    private readonly checkEmailUrl = this.registerInterface.getRegisterUrl() + '/check-email';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    email: string = '';
    usernameExists: boolean | null = null;
    emailExists: boolean | null = null;
    response: any;
    private usernameSubject = new Subject<string>();
    private emailSubject = new Subject<string>();
    constructor() {
        this.usernameSubject
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                // filter(username => username !== null && username !== undefined), // Ensure username is not null or undefined
                //switchMap(username => this.checkUsername(username))
            )
            .subscribe(
                // existUsername => {
                //      this.usernameExists = existUsername;
                //    }
                (username) => {
                    this.checkuser(username);
                }
            );

        this.emailSubject
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),

                // switchMap(email => this.checkEmail(email))
            )
            .subscribe(
                {
                    //   next: existEmail => {
                    //     this.emailExists = existEmail;
                    //}

                }
            );
    }

    onUsernameInput(value: string) {
        this.usernameSubject.next(value);
    }

    onEmailInput(value: string) {
        this.emailSubject.next(value);
    }

    checkuser(username: string) {
        if (username === '' || username === null || username === undefined) {
            this.usernameExists = null; // Reset the username existence check
            return;
        }
        this.http.post<boolean>(this.checkUsernameUrl, { username: username })
            .subscribe({
                next: (response) => {
                    this.usernameExists = response;
                },
                error: (error) => {
                    console.error("Error checking username:", error);
                }
            });

    }

    checkUsername(username: string): Observable<boolean> {
        return this.http.post<boolean>(this.registerUrl + '/check-username', { username: username });
    }

    checkEmail(email: string): Observable<boolean> {
        this.response = this.http.post<boolean>(this.checkEmailUrl, { email: email });
        return this.response;
    }

    checkIfPLaceholderOfUsernameisEmpty(username: string): boolean {
        if (username === '') {
            this.usernameExists = null; // Reset the username existence check
            return false;
        }
        return true;
    }

    register() {
        console.log("Register function called");
    }

    checkIfPasswordsMatch(): boolean {
        return this.password === this.confirmPassword;
    }
    sendRegisterRequest(username: string, password: string, email: string) {
        if (!this.checkIfPasswordsMatch()) return;
        this.http.post(this.registerUrl, { password, username, email }, { withCredentials: true })
            .subscribe({
                next: (response) => {
                    console.log("Registration successful:", response);
                },
                error: (error) => {
                    console.error("Registration failed:", error);
                }
            });
    }

}