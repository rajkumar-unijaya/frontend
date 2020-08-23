import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import {Router,ActivatedRoute} from '@angular/router';
import { User } from './User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  userId :number = null;
  formvalue:User = new User();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private commonService:CommonService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
     this.userId = this.route.snapshot.params['id'];
    if(!this.userId) {
      alert("Invalid action.")
      this.router.navigate(['admin/user']);
      return;
    }
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]],
      created_at: [''],
      updated_at: [''],

  }); 
  this.commonService.getUser(this.userId)
      .subscribe( data => {
        this.userForm.setValue(data['data']);
        
      });
      
  }

  get f() { return this.userForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    else{ 
      this.commonService.updateUser(this.userForm.value,this.userId).subscribe(res=>{
      if(res.code == 200)
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
      
  }



}
