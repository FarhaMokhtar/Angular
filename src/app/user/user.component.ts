import { Component, ViewChild  } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

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


  constructor(private service:AuthService , private dialog:MatDialog){
    this.loaduser();

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

}
