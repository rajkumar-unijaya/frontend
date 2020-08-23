import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private commonService:CommonService,private router: Router) { }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]]

  });
  }
  get f() { return this.userForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    this.commonService.createUser(this.userForm.value).subscribe(res=>{
      if(res.code == 201)
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
