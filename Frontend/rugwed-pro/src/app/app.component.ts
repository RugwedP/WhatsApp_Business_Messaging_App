import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  //  constructor(private joyrideService:JoyrideService){}

 
   ngOnInit() {
    console.log("Joyride service initialized"); // Debugging
  }

 

}
