import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "../model/UserModel";
import { Post } from "../model/PostModel";
import { HttpService } from "../http.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {
  user: User;
  userMainPosts: Post[];
  userCommentPosts: Post[];
  showWhat: boolean;//false显示发帖，true显示回帖

  constructor(
    private route: ActivatedRoute,
    private myhttp: HttpService,
    private app:AppComponent
  ) { }

  ngOnInit() {
    this.user=this.app.user;
    this.showWhat=false;
    this.getUser();
    this.getSSEUserMainPosts();
    this.getSSEUserCommentPosts();
  }

  getUser(): void {
    this.myhttp.getUser(this.route.snapshot.paramMap.get("username")).subscribe(user => this.user = user);
  }

  //从服务器接受SSE消息的用户发帖post
  getSSEUserMainPosts(): void {
    console.log(this.user.username);
    const url = `/search/posts/${this.user.username}`;
    let sourceUserMainPost = new EventSource(url);
    let post = new Post;
    let flag = true;
    sourceUserMainPost.addEventListener('message', response => {
      if (flag == true) {
        this.userMainPosts = [];
        flag = false;
      }
      post = JSON.parse((<MessageEvent>response).data);
      this.userMainPosts.push(post);
    });
    sourceUserMainPost.addEventListener('error', response => {
      if (response.eventPhase == sourceUserMainPost.CLOSED) {
        flag = true;
      }
    });
  }

  //从服务器接受SSE消息的用户回帖post
  getSSEUserCommentPosts(): void {
    const url = "/search/comments/" + this.user.username;
    let sourceUserCommentPost = new EventSource(url);
    let post = new Post;
    let flag = true;
    sourceUserCommentPost.addEventListener('message', response => {
      if (flag == true) {
        this.userCommentPosts = [];
        flag = false;
      }
      post = JSON.parse((<MessageEvent>response).data);
      this.userCommentPosts.push(post);
    });
    sourceUserCommentPost.addEventListener('error', response => {
      if (response.eventPhase == sourceUserCommentPost.CLOSED) {
        flag = true;
      }
    });
  }

  showMain(): void {
    this.showWhat = false;
  }

  showComment(): void {
    this.showWhat = true;
  }

}
