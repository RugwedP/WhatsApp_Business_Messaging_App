import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WhatsappServiceService } from '../whatsapp-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-use-template',
  templateUrl: './use-template.component.html',
  styleUrls: ['./use-template.component.css']
})
export class UseTemplateComponent   {

  
    //change 3/3/25

  //   jsonData: any[] = []; // Store only approved templates
  //   rejectedCount: number = 0;
  //   pendingCount: number = 0;  

  //   constructor(private http: HttpClient, private router:Router,private service:WhatsappServiceService) {}
  
  //   ngOnInit() {
  //    // this.fetchMessageTemplates();

    
  //    this.service.template().subscribe((res: any) => {

  //     console.log("Response ------------------",res);
     
  //     if (res?.data) {
  //       // Filter only APPROVED templates
  //       this.jsonData = res.data.filter(item => item.status === 'APPROVED');

  //       // Count rejected and pending templates
  //       this.rejectedCount = res.data.filter(item => item.status === 'REJECTED').length;
  //       this.pendingCount = res.data.filter(item => item.status === 'PENDING').length;

  //       console.log(`Approved Templates: ${this.jsonData.length}`);
  //       console.log(`Rejected Templates: ${this.rejectedCount}`);
  //       console.log(`Pending Templates: ${this.pendingCount}`);
  //     }
  //   },
  //   (error) => {
  //     console.error('Error fetching data:', error);
  //   }
  // );
   

      
  // }
  

  // navigateToUser(template: any) {
  //   console.log("Navigating with template data: ", template);
    
  //   // Navigate to '/select-client' and pass the whole template object
  //   this.router.navigate(['/select-client'], { state: { templateData: template } });

  //   console.log(`pass template obj to `,template);
    
  // }

  // onButtonClick(button: any) {
  //   if (button.type === 'URL') {
  //     window.open(button.url, '_blank');
  //   } else if (button.type === 'PHONE_NUMBER') {
  //     window.location.href = `tel:${button.phone_number}`;
  //   }
  // }















//change 4


constructor(private router:Router,private service:WhatsappServiceService){
  console.log("INside the constructor");
  
}
cards:any[] = [];
ngOnInit()
{

console.log("INside the on init");

  debugger
  let userId  = localStorage.getItem("userId");
  const data={userId:localStorage.getItem("userId")}
    console.log('INside on init');
    this.service.getTemplates(data).subscribe((res: any) => {
      debugger;
      console.log("Response",res);
      // this.cards= res.result
     const responseKeys = Object.keys(res);
  
      // Transform response into an array of objects containing both TEMPLATE and CODE
      // this.cards = responseKeys
      //   .filter((key) => !isNaN(Number(key))) // Only keep numeric keys
      //   .map((key) => {

      //     console.log(`Processing key: ${key}, Value:`, res[key]); // Debugging log
      //     debugger;
      //     const templateData = res[key].TEMPLATE; // Extract TEMPLATE object
      //     const code = res[key].CODE; // Extract CODE value
      //     return { ...templateData, code }; // Combine TEMPLATE and CODE
      //   });

//ch1
      if (!res.result || !Array.isArray(res.result)) {
        console.error("Unexpected response format:", res);
        return;
      }
      
      // Transform response into an array of objects containing both TEMPLATE and CODE
      this.cards = res.result
        .map((item, index) => {
          console.log(`Processing index: ${index}, Value:`, item); // Debugging log
      
          if (!item.TEMPLATE) {
            console.warn(`Skipping index ${index}: TEMPLATE not found`);
            return null; // Skip invalid entries
          }
      
          return {
            ...item.TEMPLATE,
            code: item.CODE ?? '' // Ensure CODE exists, default to empty string
          };
        })
  
      console.log("Transformed cards array with CODE:", this.cards);
    });

    
}




navigateToUser(card:any)
{
  console.log(",,,,,,,,,",card)
  this.router.navigate(['/select-client'],{state:{templateData:card}})
}









  

  }





