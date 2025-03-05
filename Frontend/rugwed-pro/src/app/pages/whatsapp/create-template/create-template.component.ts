import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WhatsappServiceService } from '../whatsapp-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CdkStepperModule, BrowserModule]
})
export class CreateTemplateComponent implements OnInit {
  breadCrumbItems: Array<{}>;


  Form: FormGroup;

  constructor(private fb: FormBuilder, private service: WhatsappServiceService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Wizard', active: true }];


    this.Form = this.fb.group({

      name: ['', Validators.required],
      jsonData: ['', [Validators.required, this.jsonValidator]]  // Custom JSON Validator
    });
  }




  jsonValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) return null; // Skip validation if empty (handled by required)

    try {
      JSON.parse(control.value);  // Try parsing the input as JSON
      return null; // Valid JSON
    } catch (error) {
      return { invalidJson: true }; // Return error object if JSON is invalid
    }
  }



  onSubmit() {
    debugger;
  
    if (this.Form.valid) {
      console.log('Valid Form Data:', this.Form.value);
  
      let obj = {
        NAME: this.Form.get("name").value,
        JSON: this.Form.get("jsonData").value,
        USERID: localStorage.getItem("userId"),
      };
  
      // No try-catch, handle errors in the subscribe block
      this.service.saveTemplate(obj).subscribe({
        next: (res) => {
          console.log("Response: ", res);
          if (res != null) {
            Swal.fire({
              icon: 'success',
              title: 'Template Stored Successfully',
              confirmButtonText: 'OK',
            });
          }
        },
        error: (err) => {
          console.error("Error: ", err);
  
          Swal.fire({
            icon: 'error',
            title: 'Template Name Should Be Unique',
            // text: err?.error?.message || 'An unexpected error occurred.',
          });
        },
      });
    } else {
      console.log('Form is invalid');
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please Provide All The Details.',
      });
    }
  }


}
