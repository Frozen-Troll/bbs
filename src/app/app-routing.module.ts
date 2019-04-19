import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostComponent } from "./post/post.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { PullPostComponent } from "./pull-post/pull-post.component";
import { RegisterComponent } from "./register/register.component";
import { CommunityComponent } from "./community/community.component";
import { PutPostComponent } from './put-post/put-post.component';
import { BackgroundComponent } from './background/background.component';
import { UserCenterComponent } from './user-center/user-center.component';

const routes: Routes = [
  {path: '', redirectTo:'/homepage',pathMatch: "full"},
  {path: 'homepage',component: HomepageComponent},
  {path: 'community',component:CommunityComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'community/:community',component: PostComponent},
  {path: 'community/:community/pullpost',component: PullPostComponent},
  {path: 'community/:community/putpost/:id',component: PutPostComponent},
  {path: 'community/:community/post/:id', component: PostDetailComponent},
  {path: 'background', component: BackgroundComponent},
  {path: 'user/:username', component:UserCenterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
