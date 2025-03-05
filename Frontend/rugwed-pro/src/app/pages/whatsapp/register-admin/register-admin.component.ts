import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UIModule } from "../../../shared/ui/ui.module";
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { WhatsappServiceService } from '../whatsapp-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
  standalone:true,
  imports: [UIModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule],
})
export class RegisterAdminComponent {

  fieldTextType!: boolean;
  productForm!: UntypedFormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  files: File[] = [];

  constructor(public formBuilder: UntypedFormBuilder, private http: HttpClient,private service : WhatsappServiceService,private router:Router, private joyrideService:JoyrideService) { }
   
  /**
   * Returns form
   */
  get form() {
    return this.productForm.controls;
  }
  

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];

    this.productForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      profilename: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      gender:['Male',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      dateField: ['', [Validators.required]]
     
    });
    this.submit = false;
  }



 


  validSubmit() {
    this.submit = true;
    const formData = new FormData();
    if(this.productForm.valid)
    {
      console.log("Inside valid")
      formData.append('USERNAME', this.productForm.get('username').value);
      formData.append('U_PASSWORD', this.productForm.get('password').value);
      formData.append('PRO_NAME', this.productForm.get('profilename').value);
      formData.append('MOBILE', this.productForm.get('mobilenumber').value);
      formData.append('GENDER', this.productForm.get('gender').value);
      formData.append('Date', this.productForm.get('dateField').value);
      // formData.append('image', this.file, this.image);
  
  
       console.log('formdata has values before convert to object ',formData);
       
       
       //convert it into object to send
    const obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value; 
    });
    console.log("Form Data Object:", obj);
  
  

//api call

    this.service.registerAdmin(obj).subscribe(res=>{
  
      Swal.fire({
        icon: 'success',
        title: 'Admin Registered Successfully',
        confirmButtonText: 'OK'
      }).then((result) => {
        this.productForm.setValue({
          username:[''],
          password:[''],
          profilename: ['', ],
          mobilenumber: ['',],
          gender:['',]
        })
      });
      
    },
    (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: '',
      });
    })
    
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
