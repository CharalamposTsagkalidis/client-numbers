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
    imports: [FormsModule,CommonModule],
})

export class MainPageComponent {
    private http = inject(HttpClient);
    private  url = "http://localhost:11000/api/regnonize-numbers/service/numbers";
    // This is the input field for numbers
    numberInput= '';

    private inputChange= new Subject<string>();
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
        console.log("Input changed:", value);
        this.numberInput = value; // Update the input field value
        console.log("Updated numberInput:", this.numberInput);
        this.inputChange.next(value);
    }


    processAndSend(input:string) {
        //const nums = input.split(",").map(num => Number(num.trim())).filter(num => !isNaN(num));
        const nums = input.split(",");
        //this.numbers = [nums].flat();
        this.numbers = nums;
        console.log("Processed numbers:", this.numbers);
      
        this.http.post(this.url,{numbers:this.numbers}).subscribe({
            next: (response) => {
                console.log("Numbers sent successfully:", response);
            },
            error: (error) => {
                console.error("Error sending numbers:", error);
            }
        });
   
    }
}