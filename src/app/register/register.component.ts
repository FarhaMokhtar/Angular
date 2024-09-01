import { Component } from '@angular/core';
import { FormBuilder , Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private builder :FormBuilder 
    , private toastr:ToastrService ,private service:AuthService ,private router:Router){
  }

  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    name:this.builder.control('' ,Validators.required),
    password:this.builder.control('' ,Validators.compose([Validators.required])),
    email:this.builder.control('' ,Validators.compose([Validators.required, Validators.email])),
    gender:this.builder.control('female'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  })

  proceedRegistration(){
    if(this.registerform.valid){
      this.service.proceedregister(this.registerform.value).subscribe(res=>{
        this.toastr.success('Registered Successfully');
        this.router.navigate(['login']);
      });
    }else{
     alert('please Enter valid data');
    }
  }
}
