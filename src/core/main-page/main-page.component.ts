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
    numberInput= '';

    private inputChange= new Subject<string>();
    numbers: number[] = [];
    constructor() {
        this.inputChange
            .pipe(
                // Add any operators you need here, e.g., debounceTime, distinctUntilChanged, etc.
                debounceTime(300), // Wait for 300ms pause in events
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
        this.inputChange.next(value);
    }

    processAndSend(input:string) {
        const nums = input.split(",").map(num => Number(num.trim)).filter(num => !isNaN(num));
        
        this.numbers = nums;
        
        this.http.post("http://localhost:3000/numbers",nums).subscribe({
            next: (response) => {
                console.log("Numbers sent successfully:", response);
            },
            error: (error) => {
                console.error("Error sending numbers:", error);
            }
        });
   
    }

    
}