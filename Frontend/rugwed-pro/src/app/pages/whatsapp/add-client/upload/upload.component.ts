import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';
import { UIModule } from "../../../../shared/ui/ui.module";
import bootstrap, { Modal } from 'bootstrap';
import * as XLSX from 'xlsx';
import { WhatsappServiceService } from '../../whatsapp-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone:true,
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule, UIModule]
})
export class UploadComponent {


  
// {message: 'Client Add Successfully', results: Array(1), duplicateNumbers: Array(0), NotInWhatsapp: Array(0)}
// NotInWhatsapp
// : 
// []
// duplicateNumbers
// : 
// []
// message
// : 
// "Client Add Successfully"
// results
// : 
// Array(1)
// 0
// : 
// {MOBILE: '7773972212', NAME: 'Akshay'}
// length
// : 
// 1



  typeValidationForm: UntypedFormGroup; // type validation form
  fileName: string = '';
  excelData: any[] = []; // Array to store extracted data


  
  @ViewChild('errorModal') errorModal!: ElementRef<HTMLDivElement>;
    missingData: any[];
  

  ngAfterViewInit(): void {
    if (!this.errorModal) {
      console.error('Error modal not found!');
    } else {
      console.log('Error modal initialized:', this.errorModal);
    }
  }

  constructor(public formBuilder: UntypedFormBuilder, private service: WhatsappServiceService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;
  formsubmit: boolean;
  typesubmit: boolean;
  rangesubmit: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Validation', active: true }];

   

    this.typeValidationForm = this.formBuilder.group({
      // execelFile:['',Validators.required],
     
    });


   
    this.submit = false;
    this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false;
  }

 
  validSubmit() {
    this.submit = true;
  }

  

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
  }

  

 





  handleFileUpload(event: Event) {
    ;
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      const validExtensions = ['xls', 'xlsx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!validExtensions.includes(fileExtension || '')) {
        input.value = ''; // Reset the input

        // Show error modal for invalid file format
        const modalElement = this.errorModal.nativeElement;
  const errorModalInstance = new Modal(modalElement);
  errorModalInstance.show();
      } else {
        this.fileName = file.name;
        this.readExcelFile(file);
      }
    }
  }

  readExcelFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet is required
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.excelData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Extracted Excel Data:', this.excelData);
    };

    reader.readAsArrayBuffer(file);
  }

//   validateAndSendData() {


// this.missingData = []; // Reset missing data array

// const allowedColumns = ["CLI_NAME", "MOBILE", "CLI_ADDRESS", "CATEGORY", "COUNTRY_CODE"];
// this.excelData.forEach((row) => {
//   // Get keys of the current row
//   const rowKeys = Object.keys(row);

//   // Check if ALL mandatory columns exist
//   const hasRequiredColumns =
//     rowKeys.includes("CLI_NAME") &&
//     rowKeys.includes("MOBILE") &&
//     rowKeys.includes("CLI_ADDRESS") &&
//     rowKeys.includes("CATEGORY") &&
//     rowKeys.includes("COUNTRY_CODE");

//   // Check if there are any extra columns (not in allowedColumns)
//   const extraColumns = rowKeys.filter((key) => !allowedColumns.includes(key));

//   if (!hasRequiredColumns || extraColumns.length > 0) {
//     ;
//     // Add to missingData if mandatory fields are missing or extra columns exist
//     this.missingData.push({
//       CLI_NAME: row.CLI_NAME || null,
//       MOBILE: row.MOBILE || null,
//       CLI_ADDRESS: row.CLI_ADDRESS || null,
//       CATEGORY: row.CATEGORY || null,
//       COUNTRY_CODE: row.COUNTRY_CODE || null, 
//       extraColumns: extraColumns.length > 0 ? extraColumns : null, // Log unexpected columns
//     });
//   }
// });  

// if (this.missingData.length > 0) {
//   // Show modal with error table
//   const modalElement = this.errorModal.nativeElement;
//   const errorModalInstance = new Modal(modalElement);
//   console.log("Invalid Rows:", this.missingData);
//   errorModalInstance.show();
// } else {
//   console.log("Valid Data:", this.excelData);
//   // "USER__CODE",localStorage.getItem("userId")
//   const finalData = {
//     data:[...this.excelData],
//     USER_CODE : localStorage.getItem("userId")
//   }
//   console.log(finalData)
//   this.sendDataToBackend(finalData);
// }

//   }



//ch1

//ch1

validateAndSendData() {
  if (!this.fileName) {
    Swal.fire({
      icon: "warning",
      title: "No File Selected",
      text: "Please select an Excel file before proceeding.",
      confirmButtonText: "OK",
    });
    return; // Stop further execution
  }

  this.missingData = []; // Reset missing data array
  const allowedColumns = ["CLI_NAME", "MOBILE", "CLI_ADDRESS", "CATEGORY", "COUNTRY_CODE"];
  const invalidMobileNumbers: string[] = []; // Store invalid mobile numbers

  this.excelData.forEach((row) => {
    const rowKeys = Object.keys(row);

    // Check if ALL mandatory columns exist
    const hasRequiredColumns =
      rowKeys.includes("CLI_NAME") &&
      rowKeys.includes("MOBILE") &&
      rowKeys.includes("CLI_ADDRESS") &&
      rowKeys.includes("CATEGORY") &&
      rowKeys.includes("COUNTRY_CODE");

    // Check if there are any extra columns (not in allowedColumns)
    const extraColumns = rowKeys.filter((key) => !allowedColumns.includes(key));

    // Validate Mobile Number (Must be Indian: 10-digit & start with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(row.MOBILE)) {
      invalidMobileNumbers.push(row.MOBILE);
    }

    if (!hasRequiredColumns || extraColumns.length > 0 || invalidMobileNumbers.length > 0) {
      this.missingData.push({
        CLI_NAME: row.CLI_NAME || null,
        MOBILE: row.MOBILE || null,
        CLI_ADDRESS: row.CLI_ADDRESS || null,
        CATEGORY: row.CATEGORY || null,
        COUNTRY_CODE: row.COUNTRY_CODE || null,
        extraColumns: extraColumns.length > 0 ? extraColumns : null, // Log unexpected columns
      });
    }
  });

  // If invalid mobile numbers exist, show Swal fire alert
  if (invalidMobileNumbers.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Invalid Mobile Number(s)",
      html: `
        <strong>The following numbers are invalid:</strong><br> 
        ${invalidMobileNumbers.join("<br>")}<br><br>
        <strong>Note:</strong> Mobile numbers must be exactly <b>10 digits</b> and start with <b>6, 7, 8, or 9</b>.
      `,
      confirmButtonText: "OK",
    });
    return; // Stop execution
  }

  if (this.missingData.length > 0) {
    // Show modal with error table
    const modalElement = this.errorModal.nativeElement;
    const errorModalInstance = new Modal(modalElement);
    console.log("Invalid Rows:", this.missingData);
    errorModalInstance.show();
  } else {
    console.log("Valid Data:", this.excelData);
    const finalData = {
      data: [...this.excelData],
      USER_CODE: localStorage.getItem("userId"),
    };
    console.log(finalData);
    this.sendDataToBackend(finalData);
  }
}



   //ch2
   
   isLoading:boolean = false;
   
   @ViewChild('resultModal', { static: false }) resultModal!: ElementRef;
  
   modalData = {
     clientsAdded: [],
     notInWhatsapp: [],
     duplicateNumbers: [],
   };
 
   sendDataToBackend(data: any) {
debugger;
    if(data != ''){

      this.service.uploadExcel(data).subscribe(
        (res) => {
         this.isLoading = true;
       
          console.log("Uploaded Result", res);
          const { results, NotInWhatsapp, duplicateNumbers } = res;
  
          // Update modal data
          this.modalData = {
            clientsAdded: results,
            notInWhatsapp: NotInWhatsapp,
            duplicateNumbers: duplicateNumbers,
          };
  
          // Show the modal after ensuring it's loaded
          setTimeout(() => {
           this.isLoading = false;
          
            const modalElement = this.resultModal.nativeElement;
            const modalInstance = new Modal(modalElement);
            modalInstance.show();
          }, 100);
        },
        (err) => {
          console.error(err);
         
         
        }
      );
    }

    
   }
   

  }






