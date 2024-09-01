import {NgModule} from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    exports :[
        MatInputModule , 
        MatSelectModule  ,
        MatCardModule ,
        MatRadioModule , 
        MatCheckboxModule , 
        MatTableModule , 
        MatSortModule, 
        MatDialogModule , 
        MatPaginatorModule,
        ToastrModule,
        ReactiveFormsModule
    ]
})
export class MaterialModule{}