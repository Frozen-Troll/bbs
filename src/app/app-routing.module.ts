import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostComponent } from "./post/post.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { PullPostComponent } from "./pull-post/pull-post.component";
import { RegisterComponent } from "./register/register.component";
import { CommunityComponent } from "./community/community.component";

const routes: Routes = [
  {path: '', redirectTo:'/homepage',pathMatch: "full"},
  {path: 'homepage',component: HomepageComponent},
  {path: 'login',component: LoginComponent},
  {path: 'post',component: PostComponent},
  {path: 'detail/:id', component: PostDetailComponent},
  {path: 'post/pull',component: PullPostComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'community',component:CommunityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
