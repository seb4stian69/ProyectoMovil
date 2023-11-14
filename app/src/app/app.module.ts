import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './Pages/AppComponent/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './Pages/Admin/admin.component';
import { RouterModule } from '@angular/router';
import { routes } from './Routes/RoutesApp.route';
import { LoginComponent } from './Pages/Login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
