import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { CommonService } from './common.service';

import { ListUserComponent } from './User/list-user.component';
import { CreateUserComponent } from './User/create-user.component';
import { UpdateUserComponent } from './User/update-user.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
