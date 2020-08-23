import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import {Router,ActivatedRoute} from '@angular/router';
import{User} from './User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  config : any;
  collection:string[] = [];
  users:User[];
  totalRecords : number;
  page:number = 1;
  pages:number;
  limit:number;
  getInsert:String;
  getUpdate:String;
  constructor(private http: HttpClient,private commonService:CommonService,private router: Router,private route:ActivatedRoute) {
    this.config = {
      CurrentPage : 1,
      itemPerPage : 10,
      totalItems : 0
    }
    this.route.queryParams.subscribe(params=>this.config.CurrentPage = params['page'] ? params['page']:1)
    for(let i=1; i<=100;i++)
    {
      this.collection.push(`item ${i}`);
    }
   }

pageChange(newPage:number)
{
this.router.navigate([''],{queryParams:{page:newPage}});
}

  ngOnInit() {
    this.getInsert = this.commonService.getInsertion();
    this.getUpdate = this.commonService.getUpdation();
    
   this.commonService.listUsers().subscribe(res=>{
     this.users = res['data'];
     this.totalRecords = res.meta.pagination.total;
     this.page = res.meta.pagination.page;
     this.pages = res.meta.pagination.pages;
     this.limit = res.meta.pagination.limit;
     
    });
    
    
  }
  editUser(idval:number): void {
    this.router.navigate(['admin/user/update/'+idval]);
    }
    deleteUser(idval:number): void { 
      this.commonService.deleteUser(idval).subscribe(res=>{
        if(res.code === 204)
        {
        this.commonService.setInsertion("User");  
        this.router.navigate(['admin/users']);
        }
        else if(res.code == 200)
        {
        this.commonService.setInsertion("User");  
        this.router.navigate(['admin/users']);
        }
        else if(res.code == 201)
        {
        this.commonService.setInsertion("User");  
        this.router.navigate(['admin/users']);
        }
        else if(res.code == 422)
        {
        alert(res.data[0]['field']+' '+res.data[0].message);
        return false;
        }
        else if(res.code == 401)
        {
        alert(res.data.message);
        return false;
        }
        else if(res.code == 403)
        {
        alert(res.data.message);
        return false;
        }
        else if(res.code == 405)
        {
        alert(res.data.message);
        return false;
        }
        else if(res.code == 500)
        {
        alert(res.data.message);
        return false;
        }
        });
      }


    
  addUser(): void {
      this.router.navigate(['admin/user/create']);
  } 
  
  }


