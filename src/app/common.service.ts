import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CommonService {
  formvalue={};
  successMsg:String;
  updateMsg:String;
  constructor(private http:HttpClient) { }   
  
  public LocalHostContextURL:string = "http://localhost:8100/";

  public ContextURL:string = "https://gorest.co.in/public-api/";
  setInsertion(successMsg)
  {
this.successMsg = successMsg+" inserted successfully";
  }
  getInsertion()
  {
    return this.successMsg;
  }
  setUpdation(updateMsg)
  {
this.updateMsg = updateMsg+" Update successfully";
  }
  getUpdation()
  {
    return this.updateMsg;
  }
  getContextUrl(){
    return this.ContextURL;
  }
  getRequest(url):Observable<any>{
    return this.http.get(url,{
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-auth-token" : localStorage.token
      })
    });
  }
  postRequest(url,object):Observable<any>{
    return this.http.post(url,object,{
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-auth-token" : localStorage.token
      })
    });
  }
  
listUsers():Observable<any>{
  return this.http.get(this.ContextURL+"users", {headers: new HttpHeaders({"Content-Type" : "application/json"})});
}

createUser(userDetails:any):Observable<any>{
  
  return this.http.post(this.ContextURL+"users",userDetails, {headers: new HttpHeaders({"Content-Type" : "application/json","Authorization":"Bearer dc40c530913f877c1965064b6b32210991729718680d23c48e30c641b3a29b62"})});
 }
 getUser(userDetails:any):Observable<any>{
  return this.http.get(this.ContextURL+"users/"+userDetails, {headers: new HttpHeaders({"Content-Type" : "application/json"})});
}

updateUser(userDetails:any,userId:any):Observable<any>{
  return this.http.put(this.ContextURL+"users/"+userId,userDetails, {headers: new HttpHeaders({"Content-Type" : "application/json","Authorization":"Bearer dc40c530913f877c1965064b6b32210991729718680d23c48e30c641b3a29b62"})});
 }
 deleteUser(userId:any):Observable<any>{
  return this.http.delete(this.ContextURL+"users/"+userId, {headers: new HttpHeaders({"Content-Type" : "application/json","Authorization":"Bearer dc40c530913f877c1965064b6b32210991729718680d23c48e30c641b3a29b62"})});
 } 

}
