import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import {AdsService} from './services/ads.service'
import { SupportService } from './services/support.service';
// import{AuthGuard} from './guards/auth.guard'
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SupportComponent } from './support/support.component';
import { CmsComponent } from './cms/cms.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountsComponent } from './accounts/accounts.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SupportReplyComponent } from './support/support-reply/support-reply.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import{AuthGuard} from './guards/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { AdsComponent } from './ads/ads.component';
// import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    SupportComponent,
    CmsComponent,
    ForgotPasswordComponent,
    AccountsComponent,
    SupportReplyComponent,
    ChatComponent,
    AdsComponent,
  
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [AuthService,SupportService,AdsService ,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[SupportReplyComponent],
})
export class AppModule { }
