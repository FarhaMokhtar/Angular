import { Component, ViewChild  } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { AddUserComponent } from '../add-user/add-user.component'; 


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  displayedColumns: string[] = ['username', 'name', 'email', 'gender', 'status', 'action'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  haveadd=false;
  havedelet=false;
  haveedit=false;
  accessdata:any;


  constructor(private service:AuthService , private dialog:MatDialog){
    this.loaduser();
    // this.SetAccessPermation();

  }
  userlist:any;
  loaduser(){
    this.service.GetAll().subscribe(res=>{
      //console.log(res);
      this.userlist=res;
      this.dataSource=new MatTableDataSource(this.userlist);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  UpdateUser(code:any){
   const popup= this.dialog.open(UpdateComponent , {
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width: '50%',
      data:{
        usercode:code
      }
      })
      popup.afterClosed().subscribe(res=>{
        this.loaduser();
      })
  }
  opendialog(){

  }
  RemoveUser(code:any){
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(code).subscribe(
        response => {
          console.log('User deleted successfully');
          this.loaduser(); 
        },
        error => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loaduser();
      alert('User added successfully');
    });
  }

}
