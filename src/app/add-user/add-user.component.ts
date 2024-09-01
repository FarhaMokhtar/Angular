import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  registerform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddUserComponent> // لإغلاق النافذة
  ) {}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      isActive: [false]
    });
  }

  onSubmit() {
    if (this.registerform.valid) {
      const newUser =this.registerform.value;

      this.authService.proceedregister(newUser).subscribe(
        response => {
          console.log('User added successfully', response);
          this.dialogRef.close(true); // إغلاق النافذة وتمرير قيمة 'true' للدلالة على النجاح
        },
        error => {
          console.error('Error adding user', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
