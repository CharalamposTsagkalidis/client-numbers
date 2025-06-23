import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
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
    private url = "http://localhost:11000/api/regnonize-numbers/service/numbers";
    // This is the input field for numbers
    numberInput = '';
    naturalNumbers: number[] = [];
    wholeNumbers: number[] = [];
    realNumbers: number[] = [];

    private inputChange = new Subject<string>();
    numbers: string[] = [];
    constructor() {
        this.inputChange
            .pipe(
                // Add any operators you need here, e.g., debounceTime, distinctUntilChanged, etc.
                debounceTime(1000), // Wait for 300ms pause in events
                // Only emit if the current value is different than the last
                distinctUntilChanged()
            )
            .subscribe(input => {
                this.processAndSend(input);
                // You can also make an HTTP request here if needed
                // this.http.get('your-api-endpoint').subscribe(response => { ... });
            });
    }

    onInputChange(value: string) {
        this.numberInput = value; // Update the input field value
        this.inputChange.next(value);
    }


    processAndSend(input: string) {
        //const nums = input.split(",").map(num => Number(num.trim())).filter(num => !isNaN(num));
        const nums = input.split(",").map(num => num.trim().replace(/"/g, ''));
        //this.numbers = [nums].flat();
        this.numbers = nums;

        this.http.post<{ naturalNumbers: number[], wholeNumbers: number[], realNumbers: number[] }>(this.url, { numbers: this.numbers }).subscribe({
            next: (response) => {
                this.naturalNumbers = response.naturalNumbers;
                this.wholeNumbers = response.wholeNumbers;
                this.realNumbers = response.realNumbers;                
            },
            error: (error) => {
                console.error("Error sending numbers:", error);
            }
        });

    }
//return the maximum length of the arrays
    get maxLength(): number{
        return Math.max(
            this.naturalNumbers.length,
            this.wholeNumbers.length,
            this.realNumbers.length
        );
    }

    get indexArray(): number[] {
        return Array.from({ length: this.maxLength }, (_, i) => i);
    }

    clearNumbers(){}
}
