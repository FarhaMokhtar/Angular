import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='http://localhost:3001/user';
  constructor(private http:HttpClient) { }
  GetAll(){
    return this.http.get(this.apiurl);
  }
  GetAllRole(){
    return this.http.get('http://localhost:3001/role');
  }
  Getbycode(code:any){
    return this.http.get(this.apiurl +'/' +code );
  }
  proceedregister(inputdata: any){
    return this.http.post(this.apiurl,inputdata)
  }
  updatuser(code: any, inputdata: any) {
    const url = `${this.apiurl}/${code}`; 
    return this.http.put(url, inputdata);
  }  
  deleteUser(code: any) {
    return this.http.delete(`${this.apiurl}/${code}`);
  }
  IsloggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  GetUserrole(){
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')!.toString() : '';
  }
  // Getacessbyrole(role:any , menu:any){
  //   return this.http.get('http://localhost:3001/roleaccess?role='+role+'&menu='+menu);
  // }
}
