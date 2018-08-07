import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CmsComponent } from './cms/cms.component';
import { SupportComponent } from './support/support.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AuthGuard} from './guards/auth.guard'
import { AccountsComponent } from './accounts/accounts.component';
import { ChatComponent } from './chat/chat.component';
import { AdsComponent } from './ads/ads.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',   
    
  },
   
      
      { path: 'dashboard' , 
      component: DashboardComponent,
      canActivate: [AuthGuard] // User must be logged in to view this route
    },

      { path: 'support' ,
       component: SupportComponent,
       canActivate: [AuthGuard]
      },


      { path: 'accounts' , 
      component: AccountsComponent,
      canActivate: [AuthGuard]
    },


      { path: 'cms' ,
       component: CmsComponent,
       canActivate: [AuthGuard]
      },


      { path: 'forgotPassword' ,
       component: ForgotPasswordComponent
      },


      { path: 'chat' ,
       component: ChatComponent,
       canActivate:[AuthGuard]
      },

      { path: 'ads' ,
      component:AdsComponent,
      canActivate:[AuthGuard]
     },

      {
        path: '**',
        component: LoginComponent
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
