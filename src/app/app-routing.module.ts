import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './User/list-user.component';
import { CreateUserComponent } from './User/create-user.component';
import { UpdateUserComponent } from './User/update-user.component';
const routes: Routes = [
   { path:"",redirectTo: "admin/users", pathMatch: "full" },
   {path:"admin/users",component:ListUserComponent},
   {path:"admin/user/create",component:CreateUserComponent},
   {path:"admin/user/update/:id",component:UpdateUserComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
