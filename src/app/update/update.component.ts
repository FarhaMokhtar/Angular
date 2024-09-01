import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../service/auth.service';
import { Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(private builder: FormBuilder
    , private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
    , private toaster: ToastrService,
    private dialog: MatDialogRef<UpdateComponent>) {

  }
  editdata: any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res;

    })
    if (this.data.usercode != null && this.data.usercode != "") {
      this.service.Getbycode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
          role: this.editdata.role,
          gender: this.editdata.gender,
          isactive: this.editdata.isactive})
      });
    }
  }
  rolelist: any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('female'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  })

  updateuser() {
    if (this.registerform.valid) {
      this.service.updatuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this.toaster.success('updated succesfully');
        this.dialog.close();
      });

    } else {
      this.toaster.warning('please select role.')
    }
  }
}
