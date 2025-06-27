import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { consumerAfterComputation } from "@angular/core/primitives/signals";
import { FormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.css"],
    standalone: true,
    imports: [FormsModule, CommonModule],
})

export class MainPageComponent {
    private http = inject(HttpClient);
    private readonly url = "http://localhost:11000/api/regnonize-numbers/service/numbers";
    errorMessage: string | null = null;
    private errorTimeout: any;
    // This is the input field for numbers
    numberInput = '';
    naturalNumbers: number[] = [];
    wholeNumbers: number[] = [];
    realNumbers: number[] = [];
    hasResponse = false;
    sizeOfNaturalNumbers: number = 0;
    sizeOfWholeNumbers: number = 0;
    sizeOfRealNumbers: number = 0;

    private inputChange = new Subject<string>();
    numbers: string[] = [];
    constructor() {
        this.inputChange
            .pipe(
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(input => {
                const trimCommas = input.split(",");
                if (trimCommas.length > 500) {
                    this.setError("Input is too long. Please limit to 500 characters.");
                    return;
                }

                this.processAndSend(input);
            });
    }
    checkPlaceholderViaDOM() {

    }
    private setError(message: string) {
        this.errorMessage = message;
        this.numberInput = ''; // Clear the input field

        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }

        this.errorTimeout = setTimeout(() => {
            this.clearError();
        }, 5000); // Clear the error after 5 seconds

    }

    private clearError() {
        this.errorMessage = null;
    }

    onInputChange(value: string) {
        this.numberInput = value; // Update the input field value
        this.inputChange.next(value);
    }


    processAndSend(input: string) {
        //const nums = input.split(",").map(num => Number(num.trim())).filter(num => !isNaN(num));
        const nums = input.split(",").map(num => num.trim().replace(/"/g, '')).filter(num => num !== '');
        //this.numbers = [nums].flat();
        this.numbers = nums;

        this.http.post<{ naturalNumbers: number[], wholeNumbers: number[], realNumbers: number[], sizeOfNaturalNumbers: number, sizeOfWholeNumbers: number, sizeOfRealNumbers: number }>(this.url, { numbers: this.numbers }).subscribe({
            next: (response) => {
                this.naturalNumbers = response.naturalNumbers;
                this.wholeNumbers = response.wholeNumbers;
                this.realNumbers = response.realNumbers;
                this.hasResponse = true;
                this.sizeOfNaturalNumbers = response.sizeOfNaturalNumbers;
                this.sizeOfWholeNumbers = response.sizeOfWholeNumbers;
                this.sizeOfRealNumbers = response.sizeOfRealNumbers;

            },
            error: (error) => {
                console.error("Error sending numbers:", error);
            }
        });

    }
    //return the maximum length of the arrays
    get maxLength(): number {
        return Math.max(
            this.naturalNumbers.length,
            this.wholeNumbers.length,
            this.realNumbers.length
        );
    }

    get indexArray(): number[] {
        return Array.from({ length: this.maxLength }, (_, i) => i);
    }

    clearNumbers() {
        this.numberInput = '';
        this.numbers = [];
        this.naturalNumbers = [];
        this.wholeNumbers = [];
        this.realNumbers = [];
        console.log("Cleared all numbers");
        window.location.reload(); // Reload the page to reset the state
    }

}
