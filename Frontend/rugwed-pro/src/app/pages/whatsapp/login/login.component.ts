import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../../form/form.module';
import { CommonModule } from '@angular/common';
// import { WhatsappServiceDirective } from '../whatsapp-service.directive';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WhatsappServiceService } from '../whatsapp-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,FormModule,CommonModule]
})
export class LoginComponent {

  example_form : FormGroup
  showPassword: boolean = false;
  constructor(private formBuilder:FormBuilder,private service:WhatsappServiceService ,private readonly router:Router){
    this.example_form = formBuilder.group({
      username : [""],
      password :[""]
    })
  }


  
 
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  onSubmit()
  {
    if (this.example_form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter valid username and password!',
        confirmButtonText: 'OK'
      });
      return;
    }

    let formData = this.example_form.value;

    let obj = {
      USERNAME: formData.username,
      PASSWORD: formData.password
    };
    console.log("OBJ : ",obj);
    
    this.service.login(obj).subscribe(
      (res) => {
        debugger
        console.log(res);

        localStorage.setItem('token2', res.token);
        localStorage.setItem('userId', res.user.CODE);
        localStorage.setItem('profileId', res.user.PROFILE__CODE);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          confirmButtonText: 'OK'
        }).then((result) => {
        });
        this.router.navigate(['/add-client']);
      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password!',
        });
      }
    );
  }
  }

