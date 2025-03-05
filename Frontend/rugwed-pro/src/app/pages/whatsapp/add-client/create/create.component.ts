import { Component } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { WhatsappServiceService } from '../../whatsapp-service.service';
import { JoyrideService } from 'ngx-joyride';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone:true,
  imports: [UIModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule],
})
export class CreateComponent {
  constructor(public formBuilder: UntypedFormBuilder, private http: HttpClient,private router:Router,private service:WhatsappServiceService,private joyrideService: JoyrideService) { }
  
  
  // startTour1() {
  //   debugger;
  //   if (confirm('Welcome! Ready to explore the features of this application?')) {
  //     this.joyrideService.startTour({

  //       steps: ['step1', 'step2', 'step3', 'step4', 'step5', 'step6','step7','step8','step9','step10'],
  //       showCounter: true,
        
  //       showPrevButton: true,
  //       // themeColor:'#6a11cb'
  //     });
  //   }
  // }
  
  /**
   * Returns form
   */
  get form() {
    return this.productForm.controls;
  }

  productForm!: UntypedFormGroup;


   formDataArray: any[] = [];

   category:any[] = [];
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  files: File[] = [];

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-z A-Z]+')]],
      address: ['', [Validators.required]],
      category: ['', [Validators.required]],
      number:['',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      countryCode:['91',[Validators.required]]
      });
    this.submit = false;

        const userId =localStorage.getItem('userId');
 
         console.log('userId issss',userId);
         
     this.service.fetchCategories(userId).subscribe((res)=>{

      this.category = res;
      
           console.log("****",this.category);
           this.productForm.patchValue({
            category:this.category[0].CODE
           })
           
     })

  }




//   validSubmit() {


//     this.submit = true;
//     debugger;
//     const formData = new FormData();
//     formData.append('CLI_NAME', this.productForm.get('name').value);
//     formData.append('CLI_ADDRESS', this.productForm.get('address').value);
//     formData.append("MOBILE",this.productForm.get('number').value);
//     formData.append("CATEGORY",this.productForm.get('category').value);
//     formData.append("USER__CODE",localStorage.getItem("userId"));
//     formData.append("COUNTRY_CODE",this.productForm.get("countryCode").value);

  
//     console.log("FormData Entries:");
//   for (let [key, value] of (formData as any).entries()) {
//     console.log(key, value);
//   }

// //convert it into object to send
//   const obj: any = {};
// formData.forEach((value, key) => {
//   obj[key] = value;
// });
// console.log("Form Data Object:", obj);

//       this.formDataArray = [obj];
//        // Wrap the object in an array
//        const finalData = {
//         data:[...this.formDataArray],
//         USER_CODE: localStorage.getItem("userId")
//        }

//       console.log("Form Data Array:",finalData);

      

// //           (res) => {
// //             debugger
// //             console.log("%%%%%%%%",res);



// //             //
// // // {message: 'Client Add Successfully', results: Array(1), duplicateNumbers: Array(0), NotInWhatsapp: Array(0)}
// // // NotInWhatsapp
// // // : 
// // // []
// // // duplicateNumbers
// // // : 
// // // []
// // // message
// // // : 
// // // "Client Add Successfully"
// // // results
// // // : 
// // // Array(1)
// // // 0
// // // : 
// // // {MOBILE: '7773972212', NAME: 'Akshay'}
// // // length
// // // : 
// // // 1


        
           
        
// //             Swal.fire({
// //               icon: 'success',
// //               title: 'Client Register Successfully',
// //               confirmButtonText: 'OK'
// //             }).then((result) => {
// //               // this.router.navigate(['/dashboardpage']);
// //             });
// //           },
// //           (err) => {
            
// //             console.error(err);
// //             Swal.fire({
// //               icon: 'error',
// //               title: 'Client Registrastion Failed',
// //               // text: 'Invalid username or password!',
// //             });
// //           }
// //         );
      



// this.service.createClient(finalData).subscribe(
//   (res) => {
//     console.log("Response:", res);

     

//     if (res.results.length > 0) {
//       // If valid numbers are present in WhatsApp
//       Swal.fire({
//         icon: 'success',
//         title: 'Valid number on WhatsApp',
//         text: 'Client Added Successfully',
//         confirmButtonText: 'OK'
//       });
//     } else if (res.duplicateNumbers.length > 0) {
//       // If duplicate numbers are found
//       Swal.fire({
//         icon: 'warning',
//         title: 'Duplicate Number',
//         text: 'This number is already registered.',
//         confirmButtonText: 'OK'
//       });
//     } else if (res.NotInWhatsapp.length > 0) {
//       // If numbers are not in WhatsApp
//       Swal.fire({
//         icon: 'error',
//         title: 'Number Not on WhatsApp',
//         text: 'Please enter a valid WhatsApp number.',
//         confirmButtonText: 'OK'
//       });
//     } else {
//       // Generic success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Client Register Successfully',
//         confirmButtonText: 'OK'
//       });
//     }
//   },
//   (err) => {
//     console.error(err);
  
//     Swal.fire({
      
//       icon: 'error',
//       title: 'Client Registration Failed',
//     });
//   }
// );


    

     
   
//   }

isLoading = false;


//ch1
validSubmit() {
  this.submit = true;
 

  const formData = new FormData();
  formData.append('CLI_NAME', this.productForm.get('name').value);
  formData.append('CLI_ADDRESS', this.productForm.get('address').value);
  formData.append("MOBILE", this.productForm.get('number').value);
  formData.append("CATEGORY", this.productForm.get('category').value);
  formData.append("USER__CODE", localStorage.getItem("userId"));
  formData.append("COUNTRY_CODE", this.productForm.get("countryCode").value);

  const obj: any = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  this.formDataArray = [obj];

  const finalData = {
    data: [...this.formDataArray],
    USER_CODE: localStorage.getItem("userId")
  };

  if(this.productForm.valid)
  {

    this.isLoading = true
    this.service.createClient(finalData).subscribe(
      (res) => {
      //  this.isLoading = false; // Hide loader after API response
        if(res)
        {

          let checkLength = res.results.length
          if (checkLength > 0) {
            this.isLoading = false; 
            Swal.fire({
              icon: 'success',
              title: 'Client Added Successfully',
              confirmButtonText: 'OK'
            });


          } 
          else if (res.duplicateNumbers.length > 0) {
            this.isLoading = false; 
            Swal.fire({
              icon: 'warning',
              title: 'Duplicate Number',
              text: 'This number is already registered.',
              confirmButtonText: 'OK'
            });
          } else if (res.NotInWhatsapp.length > 0) {
    
            this.isLoading = false; 
            Swal.fire({
              icon: 'error',
              title: 'Number Not on WhatsApp',
              text: 'Please enter a valid WhatsApp number.',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Client Register Successfully',
              confirmButtonText: 'OK'
            });
          }
        }
        else
        {
          this.isLoading = true
        }
      },
      (err) => {
        this.isLoading = false; // Hide loader in case of error
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Client Registration Failed',
        });
      }
    );
  }

}



 

  
  
   

  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 100);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }
}
