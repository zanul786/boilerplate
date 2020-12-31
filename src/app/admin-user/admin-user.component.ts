import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { AdminUserService } from './admin-user.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  displayedColumns: string[] = ['First Name', 'Last Name',  'Email' , 'Is Subscriber' , 'Actions'];
  dataSource: MatTableDataSource<any>;
  


  constructor(private adminUserService : AdminUserService) { }

  ngOnInit(): void {
    this.getUserDetail();
  }


  getUserDetail(){
    this.adminUserService.getAllUsers().subscribe((data)=>{
      this.dataSource = data;
    } , 
    (err)=>{
      Swal({
        type: "error",
        title: ` ${err.error.name}!`,
        text: err.error.message,
      });
    }
    )
  }

}
